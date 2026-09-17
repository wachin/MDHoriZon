import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ResponsiveImage } from './ResponsiveImage'

/**
 * The image element itself: what it guarantees regardless of where the source came from. Sizing and
 * aspect ratio live in CSS and are checked on a device; what is checked here is everything the
 * component is responsible for.
 */

describe('the image element', () => {
  it('always exposes an alt attribute, even when the document omits one', () => {
    // An empty `alt` is the signal that an image is decorative; a missing one makes assistive
    // technology read the file name instead.
    const { container } = render(
      <ResponsiveImage alt={undefined} src="x.png" />,
    )

    expect(container.querySelector('img')?.getAttribute('alt')).toBe('')
  })

  it('keeps the alt text the document gave it', () => {
    const { container } = render(
      <ResponsiveImage alt="A wide fixture" src="wide.png" />,
    )

    expect(container.querySelector('img')?.getAttribute('alt')).toBe(
      'A wide fixture',
    )
  })

  it('defers offscreen images and decodes them off the main thread', () => {
    const { container } = render(<ResponsiveImage alt="x" src="x.png" />)
    const image = container.querySelector('img')

    expect(image?.getAttribute('loading')).toBe('lazy')
    expect(image?.getAttribute('decoding')).toBe('async')
  })

  it('passes the title the document wrote through', () => {
    const { container } = render(
      <ResponsiveImage
        alt="x"
        src="x.png"
        title="The relative fixture asset"
      />,
    )

    expect(container.querySelector('img')?.getAttribute('title')).toBe(
      'The relative fixture asset',
    )
  })

  it('marks a source that fails to load, so the alt text can be shown as a placeholder', () => {
    // A wrong relative path is the failure this phase has to make visible rather than silent.
    const { container } = render(
      <ResponsiveImage alt="Missing" src="nope.png" />,
    )
    const image = container.querySelector('img')

    expect(image?.getAttribute('data-image-state')).toBeNull()

    fireEvent.error(image as Element)

    expect(image?.getAttribute('data-image-state')).toBe('missing')
    // The alt text is still there for assistive technology and for the visible placeholder.
    expect(image?.getAttribute('alt')).toBe('Missing')
  })

  it('is not marked missing before anything has failed', () => {
    const { container } = render(<ResponsiveImage alt="x" src="x.png" />)

    expect(
      container.querySelector('img')?.hasAttribute('data-image-state'),
    ).toBe(false)
  })
})
