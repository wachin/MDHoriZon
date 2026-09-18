import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VideoEmbed } from './VideoEmbed'

/**
 * The player facade.
 *
 * The property that matters most is what is *not* there before a reader asks: no iframe, and therefore no
 * request to YouTube. Everything else is the control being usable and honest about what it plays.
 */

const VIDEO = 'https://youtu.be/G7ZqUvFMSes?si=Qpzhs52nIY8xvdHv'

describe('the video facade', () => {
  it('shows the video’s own still image before anything is played', () => {
    const { container } = render(
      <VideoEmbed href={VIDEO} label="DeepSeek Harness" />,
    )
    const poster = container.querySelector('img')

    expect(poster?.getAttribute('src')).toBe(
      'https://i.ytimg.com/vi/G7ZqUvFMSes/hqdefault.jpg',
    )
    // The button carries the name; the image is decoration.
    expect(poster?.getAttribute('alt')).toBe('')
  })

  it('contacts nothing until the reader presses play', () => {
    const { container } = render(
      <VideoEmbed href={VIDEO} label="DeepSeek Harness" />,
    )

    expect(container.querySelector('iframe')).toBeNull()
    expect(container.innerHTML).not.toContain('youtube')
  })

  it('is a real control with an accessible name', () => {
    const { getByRole } = render(
      <VideoEmbed href={VIDEO} label="DeepSeek Harness" />,
    )
    const button = getByRole('button', { name: 'Play video: DeepSeek Harness' })

    expect(button.getAttribute('type')).toBe('button')
  })

  it('does not read an address aloud as a name', () => {
    // A bare URL arrives as the link's own text, and that is not a name for the control.
    const { getByRole } = render(<VideoEmbed href={VIDEO} label={VIDEO} />)

    expect(
      getByRole('button', { name: 'Play video: YouTube video' }),
    ).toBeDefined()
  })

  it('creates the player, on the domain that does not set advertising cookies, when asked', async () => {
    const { container, getByRole } = render(
      <VideoEmbed href={VIDEO} label="DeepSeek Harness" />,
    )

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(container.querySelector('iframe')).not.toBeNull()
    })

    const frame = container.querySelector('iframe')

    expect(frame?.getAttribute('src')).toBe(
      'https://www.youtube-nocookie.com/embed/G7ZqUvFMSes?autoplay=1&rel=0',
    )
    expect(frame?.getAttribute('title')).toBe('DeepSeek Harness')
    expect(frame?.hasAttribute('allowfullscreen')).toBe(true)
    // The control is gone: there is nothing left to press twice.
    expect(container.querySelector('button')).toBeNull()
  })

  it('moves focus into the player, so a keyboard reader is not sent back to the top', async () => {
    const { container, getByRole } = render(
      <VideoEmbed href={VIDEO} label="DeepSeek Harness" />,
    )

    getByRole('button').focus()
    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(document.activeElement).toBe(container.querySelector('iframe'))
    })
  })

  it('renders nothing when the address is not a video it understands', () => {
    const { container } = render(
      <VideoEmbed href="https://vimeo.com/12345" label="Not YouTube" />,
    )

    expect(container.innerHTML).toBe('')
  })

  it('accepts every shape of YouTube address the content uses', () => {
    for (const href of [
      'https://www.youtube.com/watch?v=4_fM3Nv8BB0',
      'https://youtu.be/Mz808YZL_RI?si=x',
      'https://www.youtube.com/embed/kN_jFjBW21U',
      'https://www.youtube.com/shorts/abc123XYZ',
    ]) {
      const { container, unmount } = render(
        <VideoEmbed href={href} label="v" />,
      )

      expect(container.querySelector('img')?.getAttribute('src'), href).toMatch(
        /^https:\/\/i\.ytimg\.com\/vi\/[A-Za-z0-9_-]+\/hqdefault\.jpg$/,
      )
      unmount()
    }
  })
})
