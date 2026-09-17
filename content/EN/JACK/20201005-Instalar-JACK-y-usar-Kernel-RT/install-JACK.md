# How to Install and Use Jack Audio Connection Kit (JACK) + Ardour and Its Plugins with a Real-Time Kernel on MX Linux, Debian

**Update May 2026.** This tutorial works for Linux systems using either PipeWire or PulseAudio

# This tutorial is for Linux systems using PulseAudio or Pipewire

Before continuing, let me tell you that for me, a kernel is like a car's tires — you can replace them with others that may have different tread patterns suited for specific terrains, but first you must turn off the car and then make the change. Similarly with the kernel, the one we'll use has been created for a special purpose: audio. To change it, we must install it, then restart the computer and select it in Grub to start a session with it.

# Why did I create this tutorial?

* Because 32-bit software is increasingly scarce. Example: [AV Linux](https://www.bandshed.net/) no longer has a 32-bit version as it did in 2022 (Ubuntu Studio stopped having it years ago).
* Because if you use a particular Linux distribution and don't want to use [AV Linux](https://www.bandshed.net/) or [Ubuntu Studio](https://ubuntustudio.org/) (which have JACK installed and configured ready to use), you can learn here how to configure your Linux Operating System to work the same way.
* Because you might want to use your computer to record from the microphone while simultaneously recording a karaoke track playing in the background, and have both audible through speakers at the same time; this can be done with Ardour and is called Stereo Mix (Windows has something similar do can be done with [Virtual Audio Cable](https://vb-audio.com/Cable/)) but this is only achieved without annoying noise with the AV Linux kernel made by Trulan (explained in this tutorial).
* Because you might want to use low latencies for some audio program.
* To edit audio with Audacity and have no delay while you press Play on a specific part of the audio track waveform and hear it through speakers (you can install and use the Real Time Kernel that comes in Debian repositories, or the one from AV Linux).
* Because they might send you a new kernel where some feature was removed, for example in Kernel 6 I couldn't set [75 Hz refresh rate on the monitor](https://facilitarelsoftwarelibre.blogspot.com/search/label/75%20Hz) on that laptop

# What is low latency in the Kernel?

To use low latencies on an operating system, I can explain it in my own words: it means minimal, almost imperceptible delay, for example in audio transmitted from a microphone to a computer's speakers or another connected device. For this, we need to use a special kernel called Realtime Kernel. In contrast, AV Linux or UbuntuStudio comes fully configured, and we will learn to use those same configurations. This tutorial is for Debian-based systems, but you might adapt it for other Linux distributions.

## Tested on

This tutorial has been tested on:

- MX Linux 19 64-bit and 32-bit (PulseAudio)
- antiX 19 64-bit and 32-bit (PulseAudio)
- MX Linux 21 64-bit and 32-bit (PulseAudio)
- Debian 12 Netinstall CD with LXQT (defaults to PulseAudio, not PipeWire), 64-bit and 32-bit
- MX Linux 23 (Pipewire)

## How will we install low latency?

Here are some options, choose what you need

### 1st Option: Installing the Real-Time Kernel from Debian Repositories

In Debian there are Kernel packages called **rt** (Realtime), a kernel generally has two parts, they are in the distro repositories but you can search for them this way:

[https://packages.debian.org/linux-headers-rt](https://packages.debian.org/linux-headers-rt)

[https://packages.debian.org/linux-image-rt](https://packages.debian.org/linux-image-rt)

I've tested them and they work well with **"Jack Audio Connection Kit (JACK)"**

The following instructions are for Debian 10, 11, 12 operating systems installed from Netinstall CD which doesn't use PipeWire but uses PulseAudio.

First, it's necessary to refresh the repositories:

```bash
sudo apt-get update
```

then install the updates:

```bash
sudo apt-get upgrade
```

**Note:** The following two packages with "image" and "headers" in their names are configuration packages that automatically install the latest available RT kernel

#### Install Realtime Kernel for 32-bit from Debian repositories

If your computer uses 32-bit, enter in terminal:

```bash
sudo apt-get install dkms linux-image-rt-686-pae linux-headers-rt-686-pae
```

you can also research them online in Debian packages:

[https://packages.debian.org/linux-image-rt-686-pae](https://packages.debian.org/linux-image-rt-686-pae)

[https://packages.debian.org/linux-headers-rt-686-pae](https://packages.debian.org/linux-headers-rt-686-pae)

**To uninstall the automatic RT kernel updater packages**

These packages serve to automatically install the latest version of the kernel when you apply all system updates when a new kernel update arrives, and have it available first in Grub. To uninstall (don't worry, the RT kernels won't be uninstalled):

```bash
sudo apt-get remove linux-image-rt-686-pae linux-headers-rt-686-pae
```

#### Install Realtime Kernel for 64-bit from Debian repo

If your computer uses 64-bit, enter in terminal:

```bash
sudo apt-get install dkms linux-image-rt-amd64 linux-headers-rt-amd64
```

you can see information about those packages here:

[https://packages.debian.org/linux-image-rt-amd64](https://packages.debian.org/linux-image-rt-amd64)

[https://packages.debian.org/linux-headers-rt-amd64](https://packages.debian.org/linux-headers-rt-amd64)

**To uninstall**

Enter in terminal:

```bash
sudo apt-get remove linux-image-rt-amd64 linux-headers-rt-amd64
```

remember this doesn't uninstall the kernels you already had installed.

#### Installing Real-Time Kernel packages from Synaptic

Also you can search for them one by one in Synaptic (sometimes they take time to appear). The following screenshots are from MX Linux 21 32-bit:

linux-image-rt-686-pae

![20240314-184220 linux-image-rt-686-pae in MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBEtuKDvz8cDOWAo72jauFTmT0ji5FxLJyVzGl8Uzd43Zb1FWDqgm1l0xszQ1v51jy4dGIQ9eKOQLGY-ozlmQmfVc0-Ad_xZv5yb_szBlFrAloH9VZ1K0blzSZbm4GfbF-eULfkS7mojxEA5B8GF0EJLTmKhEbElI9ACvjPshQKClBbzR4_6ET9FAr2Rk/s16000/20240314-184220%20linux-image-rt-686-pae%20en%20MX%20Linux%2021.png)

then:

linux-headers-rt-686-pae

![20240314-184406 linux-headers-rt-686-pae in MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicJ7faXuU_MI0fBRbKhNrGOitN9oNNo6xqyAo2xfGBcjWaxvVq2QASPU4KFS2i-0csUsEPAaaZUiG_6t5Q_qjmz0RXDfr_C8_GGPohA305m_9zefYfy8D3fa6RLc_0KAnxbojgswh4pEmpqGhcVsOHWSsNW-FWfFYcekeDSoZgKXAL9jkM1Mfz2pL4x1U/s16000/20240314-184406%20linux-headers-rt-686-pae%20en%20MX%20Linux%2021.png)

and:

dkms

![20240314-184517 dkms.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMgHvBRGsPWDcUmcFRZHVsQ6iS1yanZazJ2qpVdcPD5rUK3elWsu6QLTubvoOEtwoyEyAfK20LkmQCajO9iiAOeZY_3qQZn6KgpMTZROstKMH9fcM_D1q0V-NFX2O6QraOs2mvTie1lWeXQv51Sy5fr_dsLAfqOsL_D89gw2RWvj3-1pVpPE7ThbSPvfQ/s16000/20240314-184517%20dkms.png)

the next screenshot shows in Synaptic how the Real-Time kernel is installed in MX Linux 21:

![20240314-193755 in Synaptic viewing Real-Time Kernel installation in MX Linux 21.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrD6i4_WCB4tdHzrf_pjy4Es3NLMMeKx2a-mBvzV3IbFytbw7ud1imSm_ty3LCS4eLwwmEFAqHGZBMMEVQZyZ0_chZ1aZjBtbt3uh2Wb1IyiFrtDOgwF9X0ffprcsX0kiVIbSgmxafVwYOlmzC-tOMqmf__HlcKiMeJss_QSzTeSF1kfsks4U7pPdew64/s16000/20240314-193755%20en%20synaptic%20viendo%20c%C3%B3mo%20se%20instala%20el%20Kernel%20Real%20Time%20en%20MX%20Linux%2021.png)

It takes quite a while.

### 2nd Option - Compile the Real-Time Kernel Yourself (Optional, very optional)

This could be useful if you have a low-resource computer (an old computer) that you want to install a kernel with fewer modern drivers included, meaning a lighter kernel (older), also with modern kernels some hardware might not work, for example the SD card reader or others that should work with an old kernel, see:

[https://facilitarelsoftwarelibre.blogspot.com/search/label/Compilar%20Kernel%20Real%20Time](https://facilitarelsoftwarelibre.blogspot.com/search/label/Compilar%20Kernel%20Real%20Time)

You might also want to compile the kernel yourself to customize it, for example I usually disable virtual machine Guest and Host modules since I won't use the system in either case

---

## Install packages to use Jack Audio Connection Kit (JACK)

Now, after having installed an RT Kernel, the following list of packages to install is for a Debian-based distro (I don't know if all will work on Ubuntu-based distros but you can try).

The following are the most common packages to use with JACK, copy all three lines at once and put them in the terminal:

---

```bash
sudo apt install ardour pulseaudio-module-jack qjackctl mediainfo-gui \
     calf-plugins amb-plugins tap-plugins fluid-soundfont-gm \
     dssi-host-jack dssi-utils pavucontrol a2jmidid qsynth vmpk \
     jack-keyboard jack-tools meterbridge jackd2-firewire git muse
```

Press ENTER and follow the steps:

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAx2XImgsP-2o_IG360b75L_oT6sKqPsmtUISYFW_iHs5GDuhLQ1NgXs9w9D4OB1MeOeXanhpwb4Zbd53URaiXjjLVlho47Fo6zCBlorz0psij4qX7X87r4qEV_4HR5YKAUJXDtp8CN2I/s16000/20210317-011624.png)

**Note:** Use a text editor you like, here you'll see Gedit sometimes.

---

### jackd2 Configuration

During installation a window appears saying:

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiv6AMTOXSTN309WXMMTL0nkHvfy2hX_rtaY544OwhFJIIOQqdWIlJLg1Sdh9bsMdwAcTDOwb2cN95deBSVTF66KiZ_i8fT9SI_z3z6IZdwHQsBhx0Yd8_yxAdPuTCOMhDgDfCA12sLChs/s640/Selecci%25C3%25B3n_006.png)

```
jackd2 Configuration

If you want to run jackd with real-time priorities, the user running
jackd needs permissions for that priority. Accept this option to create
the /etc/security/limits.d/audio.conf file to allow real-time priority
and <memlock> privileges to the audio group.

Running jackd with real-time priority reduces latency, but can lead to
complete system lockup when requesting all available physical memory,
which is unacceptable in multi-user environments.

Do you want to enable real-time priority for the process?

<Yes>    <No>
```

set it to Yes (use keyboard arrows to get there and then ENTER)

Also the following window will appear asking you:

"Do you want to enable real-time priority for the process?"

Click "**Next**"

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJ2dFyOPPmbWqluBHOpXthHa9JJ_Pte7RNTSu3WvyTAup22AuelZbP3_-mGaj6rUk24VBq2wBXR6G74awUypXpSxJMPmOuRaO1-VArGedOkEZgDCnG5DTVVB8WN1d71ttD1apLwSH2Vhk-fjmEQaP0kdyEcLptfjwkYiXD6Bs2wifls25hlPSZn79HCII/s16000/20240311-093947%20marcar%20habilitar%20la%20prioridad%20en%20tiempo%20real.png)

Now, if you got confused and pressed ENTER on "No" or didn't check the instruction and the system wasn't configured with RealTime, try again. For that, enter this command in terminal:

```bash
sudo dpkg-reconfigure -p high jackd2
```

and confirm it there.

---

**Note:** Before I had a section explaining how to verify the audio group when installing the Real-Time Kernel, but I removed it because in Linux operating systems that's already configured during installation, but I left it as reference [here](https://facilitarelsoftwarelibre.blogspot.com/2024/03/verificando-el-grupo-audio-en-el-kernel-real-time.html).

---

And it's necessary to **Restart** and you must choose the Real-Time Kernel from Grub

## How to choose Real-Time Kernel (RT) in GRUB

After installing the real-time kernel, we must select it manually from the boot menu (**GRUB**)

### Step 1: Restart the system

Restart your computer

### Step 2: Enter "Advanced Options"

In the GRUB menu you'll see something like:

```
MX Linux
Advanced options for MX Linux
```

Select:

👉 **Advanced options for MX Linux**

and press `Enter`.

---

### Step 3: Choose Real-Time Kernel

Now you'll see a list of installed kernels, something like:

```
MX Linux, with Linux 6.x.x-rt-amd64
MX Linux, with Linux 6.x.x-rt-amd64 (Systemd)
MX Linux, with Linux 6.x.x-amd64 
MX Linux, with Linux 6.x.x-amd64 (Systemd)
```

Here you must choose:

👉 **The one with `-rt-amd64`**

Example:

```
MX Linux, with Linux 6.1.0-rt-amd64
```

That's the **Real-Time Kernel (RT)**.

### Step 4: Verify you're using the RT kernel

Once the system has started, open a terminal and run:

```bash
uname -r
```

If everything is correct, you'll see something like:

```
6.x.x-rt-amd64
```

### Audio note (very important)

The RT kernel allows:

* Lower latency in JACK
* Better real-time performance (professional audio)
* Fewer dropouts (xruns)

But it can also be more sensitive, so always test well before using in production.

**VIDEO:**
The following is a video I made of how I chose the RT Kernel in Grub when restarting the computer:

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/kN_jFjBW21U" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen>
</iframe>

**Note**: If audio isn't synchronized with video, better open the video separately in YouTube.

---

## How to identify your hardware to optimize JACK (Optional)

When working with **real-time audio (JACK + RT Kernel)**, knowing exactly what hardware we're using is key to:

* Reduce latency
* Avoid audio dropouts (xruns)
* Detect compatibility issues
* Achieve a more stable system

## 1. Identify motherboard

Run in terminal:

```bash
sudo dmidecode -t 2
```

**Note**: This command reads BIOS/UEFI information. It doesn't always show all details, but it's very useful for initial diagnostics.

Example output:

```
Base Board Information
    Manufacturer: Dell Inc.
    Product Name: 0GRMXT
```

👉 This allows you to:

* Know the exact motherboard model
* Search for known issues in Linux
* Research compatibility with professional audio

💡 You can search online something like:

```
Dell 0GRMXT linux jack audio latency
```

## 2. View general system info

```bash
sudo dmidecode -t system
```

This shows you:

* Equipment manufacturer
* Laptop or PC model
* Serial number

## 3. View processor (CPU)

```bash
sudo dmidecode -t processor
```

👉 Important for JACK because:

* Faster CPUs → lower latency
* Some processors handle real-time better

## 4. View RAM

```bash
sudo dmidecode -t memory
```

👉 Useful to know:

* How much RAM you have
* Memory type
* Possible upgrades

💡 JACK + Ardour + plugins can consume a lot of RAM.

## 5. Why is this important for JACK?

Not all systems work the same with real-time audio.
With this information you can:

### Investigate specific issues

Example:

```
Dell Inspiron 1750 jack xruns linux
```

### Detect bottlenecks

* Slow CPU → more latency
* Low RAM → plugin failures
* Problematic chipset → audio dropouts

### Optimize your system better

Knowing your hardware you can:

* Adjust JACK buffer better
* Decide whether to use a lighter Linux OS
* Decide whether you need to upgrade your equipment

---

## Verify "real-time priority" and "memlock"

```bash
ulimit -r -l
```

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRJpI8lYirYaI6J-CitSV472G2xD8o1A1qefJZarWhtcHbOevxPjK_r98nqnBgb147oX5J3zps-p9EXGZ4NUbwni8wwnDjtjU_TnQsE62FxMjRxlQG4GZAPzTqFpp19xN73hY8hbowFHg/s16000/20201005-122447.png)

---

## Checking Real-Time Audio configuration

Program:

[https://github.com/raboof/realtimeconfigquickscan](https://github.com/raboof/realtimeconfigquickscan)

Install dependency:

```bash
sudo apt install perl-tk
```

Commands:

```bash
git clone https://github.com/wachin/realtimeconfigquickscan
cd realtimeconfigquickscan
perl ./QuickScan.pl
```

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7gdq2ikbJHrfa0dJIPxCQXDIUS79EJrL9xLJKrlNqUleK6TkBR11hFVfcCWnV_M30IZCH132_PL9ikBo-M_4EFzYs-3M_qhg1ek4mdl38BLMykQIcN6b7b4yrHjx2xY7wNhj1uK28xms/s16000/2da+parte%252C+checkeada.png)

```
cd realtimeconfigquickscan
perl ./QuickScan.pl
```

![20210928-081857.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLSwr35OOeKP7jHv8f9uWgFtnN04P6JPBLROcL3xGsinbxg-TkzaTJmexZutAL58zTPdd6JdXucgUMsuXYIahwEJv-6snOho2yIpnhO7FsM_RTwgOB1KSUFRqPiAFJxbT8i2nnzhLuWG8/s16000/20210928-081857.png)

or you can also use a launcher I created to open it easily (it's in the same location, it's the only thing I added to the fork I made of raboof), works in Dolphin:

![QuickScan Launcher](https://blogger.googleusercontent.com/img/a/AVvXsEiJhqj8pjt-DYRN6BlD_GTABISTI6YzJvD_IryKm-8vSbTr7LRzwHKQEc05ujPYocEQiytwihBy-l0mEUmelbFywkNdXeoEShCzf4i_G2xAlXv9z5RQhLJZ5eBuGdMW0lITsjwYtlTPsFHdsKM7DcknQr-fH2wcpyOKnBzccmJVlQbftF6IacVFZb6l=s16000)

In Thunar you must first add the ability to open .sh files with bash, that's done with right-click.

### Verifications to perform

I see I was missing these three:

checking cpu governors
checking swappiness
checking sysctl inotify max_user_watches

because it says there: "**not good**"

**Note:** If in some kernel you see: "Checking the ability to priorize processes with chrt" this disappears after configuring the following when you have restarted the computer.

## Checking cpu governor

Here I'll show you part of a reading:

**System configuration [Linux-Sound]**
[https://wiki.linuxaudio.org/wiki/system_configuration](https://wiki.linuxaudio.org/wiki/system_configuration)

![System configuration Linux Sound](https://blogger.googleusercontent.com/img/a/AVvXsEhM3RkaWa-JiYpcgGzjjKEWboNlXEgqAt_gp50nB85FR6FGjMMISHC5ywmroOroGhX2MFiAhm9c7xwtIfvI0cu_TkZW6L5-41iWSRVnJx0MoIH446C_sjjAVcZslOa2edv_cdTmjtWzpovxPqounNuNgBTqtx5UrJJegRM9Gw-bgDMqFfM4wIxOY1Nz=s16000)

Possible translation:

> If your CPU supports frequency scaling and the CPU frequency scaling governor is set to ondemand (which is the default value in many distributions), you may encounter xruns. The ondemand governor scales the frequency according to CPU load, higher the load, higher the frequency. But this is happening independently of the DSP load on your system, so it could happen that the DSP load suddenly increases, for example, demanding more CPU power, and that the scaling daemon activates too late, which will result in xruns because the DSP load reaches its maximum. A solution would be to use a CPU frequency scaling daemon that scales the frequency according to the DSP load on your system like jackfreqd or simply disable CPU frequency scaling completely. The latter can be achieved by setting the scaling governor to performance.

this means that since the CPU is set to ondemand by default it will have low power consumption and will create long latency events that will produce xruns (noises), to avoid this you must set the CPU to performance configuration, I leave you two possible options, you must read both to understand everything:

### Change cpu governor from system settings to performance and make it permanent

We'll use an application installed by default in MX Linux and I suppose also in other Linux, it's called: [cpufrequtils](https://askubuntu.com/a/1406529/145772) and can be seen installed in Synaptic:

![20240314-105920 checking cpufrequtils in Synaptic.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKn3xOQO3-hG8QCdfavYhFp88k0yKO5PRUa0B6LcrxtNglJRNUnmnCLl4PVYDG5PtFCWeHrItW5K4K5tVpIb6wGPKvAa0AMNYPl_SOVzgKEP6_OYiJahbMYLvpzqbQUs0AHtWbbCMW7hKWJsz8M3noLwCbjxlrDU82QnyMHEYfZrRPzi1I8_dI8yLEq_4/s16000/20240314-105920%20verificando%20cpufrequtils%20en%20synaptic.png)

If it's not installed install it from Synaptic or from terminal:

```bash
sudo apt install linux-cpupower cpufrequtils
```

Now I must edit the configuration file, to do this I'll use Gedit (you can use another, or nano if your Linux system doesn't allow using text editor when elevating privileges -but nano is hard to use- you'll need to change it there), put in terminal:

```bash
sudo gedit /etc/init.d/cpufrequtils
```

with nano

```bash
sudo nano /etc/init.d/cpufrequtils
```

If you don't know how to use nano see [this tutorial](https://facilitarelsoftwarelibre.blogspot.com/2024/08/como-usar-nano-en-linux.html).

It's an application that serves to configure your computer processor performance, and I must change in:

`GOVERNOR="ondemand"`

![20240314-105536 changing cpufreq configuration.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKAx0SapgyFCVH_wYGUa02sVcA79TolHKPDOMgQ2KVacO0XN0jekXPhi6x1HfEIIiiTCB5AsASs6AuV1Oi2uT_6Zew7_k73NqA0Ptfr-Lzb2JnruQeefh0s7geTU5QgVN2ka_wywek2wBgYgRkvLaIfoB7-9UbjYD9eRSnSr-fnpiYel-aAyv7anxx2hY/s16000/20240314-105536%20cambiar%20la%20configuraci%C3%B3n%20de%20cpufreq.png)

to:

```
GOVERNOR="performance"
```

like this:

![20240314-110321 setting performance in cpufreq.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGASUIoIpjdii9aqnbc98y69v9wP-FoK1_LNT03idVQuLORmtnzKE2Xo4LR3r3W8RCrVnB9kkmihom3gvigUZajhRSVV7eeUrv6lyMrJRR2QEvuKqLcpxkt9Y2dPMt-fvPSEXyBn4EXfvHjPo1KOnoTxHh3mDyyasonOFw1nkgBu2wBJRkyEIvOZ1SVPU/s16000/20240314-110321%20poniendo%20performance%20en%20cpufreq.png)

save and close

Restart here if you want to see changes now or restart later

### Change cpu governor with cpupower-gui (OPTIONAL, change is not permanent)

If for example you use a laptop and want to use it and save battery it would be good not to use the above method but leave it as is and install this application which is a graphical interface, and you can choose any cpu governor mode, but the change is not saved.

We can use cpupower-gui, let's check availability in:

[https://packages.debian.org/cpupower-gui](https://packages.debian.org/cpupower-gui)

as of May 23, 2025 when I check, I see it in Debian 11 bullseye, and don't see it in Debian 12 bookworm, but I do see it in testing and unstable.

It can also be downloaded and installed from:

[https://github.com/vagnum08/cpupower-gui](https://github.com/vagnum08/cpupower-gui)

Note: You can upload the .deb to virustotal.com for your peace of mind.

In Debian 13 it's already available.

To install:

```bash
sudo apt install cpupower-gui
```

This package is not available in Debian 12 bookwork but if you see in:

[https://packages.debian.org/cpupower-gui](https://packages.debian.org/cpupower-gui)

it is available in bullseye, trixie

Once installed search among your applications for:

cpupower-gui

![cpupower-gui icon](https://blogger.googleusercontent.com/img/a/AVvXsEilZby0Jr9pO0pNsAbIdwyBzU9Y-iCjc-xjXXHIPO03T24lFu7Tk3HQcfi7QOmryXHNSylDCfC5jNbT3-z8ff5OO9wZn6B8u36EHsx9mkSCC9_B1yY7YcZ7iEzWwIIMTyK5jXRgKeoFUPSTHJycIJGI1GtdS88Eed4L45q3jgoqkuctm094zdtdqUz9=s16000)

open it, and choose one of the modes you need, in this case performance:

![cpupower-gui interface](https://blogger.googleusercontent.com/img/a/AVvXsEjJYVAvHJQ73Qk8VE2sm-glWJjNpCxC0WxFrr0Uk2vewBxCyzhEnLbvYJ0xGX1e4F9Yld10Ig627W8RmgxAK__SlqGJkbiRdQ8ne5NRsw8d8xoWLn-5d2KOKaLceYbWKNSsDy9-NVdRMDws1UokrF4IxQs6SSBqNFwu-MSI13EjHg0GnzSxxgDmT4JV=s16000)

**Performance** means your processor will be working at maximum capacity, and the only thing is if you use this configuration on a laptop using battery this will make it discharge faster than normal

I'm telling you on my desktop computer I've used the first method and left the cpu permanently in performance mode.

By default the CPU Governor is set to:

Ondemand

You can manage the following profiles:

powersave
conservative
userspace
ondemand
performance
schedutil

With this tool cpupower-gui we'll have a tool like the one that came in AV Linux 2021:

[https://download.linuxaudio.org/avlinux/AVL-MXE/](https://download.linuxaudio.org/avlinux/AVL-MXE/)

![Set CPU Governor.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSqAl5-XQ6Dpd7rFZmxExVr_Ecv5Q_V8eClFuz4dN0Ay9eNWhtg65tWgGQnvfdL5z6hUJ1rYphFK-0xBrvBEGjQJvemV5vfU8IHpeQaR2eMTM1tZxEjutDCHd9E_VTkcxWguUxxQZZWUk/s16000/Set+CPU+Governor.png)

I also ask you to read the following translation as it's important to know the following when we use performance, taken from:

**How to get low latency audio**
[http://fernandoquiros.com/articles/131123-compile-linux-realtime-kernel/](http://fernandoquiros.com/articles/131123-compile-linux-realtime-kernel/)

whose translation would be:

> . . . important is to adjust Linux to avoid CPU scaling because when the CPU has low power consumption, it creates long latency events that will produce xruns. One option is to change the system governor to "performance". The processor will run at maximum speed all the time and real-time processes won't be interrupted. The computer will heat up more than normal, so try to keep it ventilated. You can change the "governor" using "cpufrequtils".

So according to this teaching, when we use the computer or laptop in performance we must take care that it's well ventilated so it doesn't overheat

### Change checking swappiness

Now we must configure the computer to avoid using swap memory at some point, meaning always use RAM memory and never use SWAP, this is because if SWAP is used it's slower and will reduce speed and create xruns or noises in JACK. If you're curious you can read about how to adjust virtual memory [here](https://ubunlog.com/swappiness-como-ajustar-el-uso-de-la-memoria-virtual/).

To see what swappiness value your operating system has by default, put in a terminal:

```bash
cat /proc/sys/vm/swappiness
```

gives me 15

![20210928-092427.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-NKd-xh-dwKz9aRq0H3J8N29kUZxxtlPH_4eDAz90qVCcwfXQfGAzfSn6ZYn406IGXvv0zXNJpPNlYZJq0vEloeN9yXIxCqx-key7obDLtEgWvmyTzsGgZtLSljHBU3yCNW1UcKL-O-o/s16000/20210928-092427.png)

to not use SWAP memory we must make it have value 10 and to do that put in terminal, to facilitate this with gedit:

```bash
sudo gedit /etc/sysctl.conf
```

Optional if you know how to use nano:

```bash
sudo nano /etc/sysctl.conf
```

there it will open, and go to the end:

![20210928-093024.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT5Vq8NI5kZidmAS-BWFaQovhd4gfEk_o9V66m7b-2vN58uvm-Ij4FA70ymgb_2wup18K1qcE4JqJNhulszltBWT-d-qItkgNLIOaEaW6Vk9Ii2KoLjuFD8mKGhjo64vcEB_q1QVj_5GY/s16000/20210928-093024.png)

there add the following line:

```
vm.swappiness = 10
```

you should have it like this:

![20210928-093229.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXm2kMZ9_KkSeXyE-HnEMm7cYte-UFjsiY4nWhM9-fPwpSh-NxN5o6MPTPbYInHQVeGa9CeuxLSKnRxWmOyZWyj6-ras79TAJ3wyfldBkSUi3d2BSCfkpVzHg9DTWetfNQbAvKuPniTck/s16000/20210928-093229.png)

save and leave open

### Change sysctl inotify max_user_watches

Next I'll put the image from AV Linux (AVL-MXE) above so you see the default value:

![MX Tools - RT Diagnostic max_users_watches.png](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiY4NBBUl7ZfdyYTIPz5Vx-XhqCYLMh4jQK5d4814AZ_yd0und39Z-QHLjQEW_3jUgQj6HBABfkmz3D60rPGvazUeLHV9OIFnstFvxpAXfyX9QL0k7lJ1MeuKq0ViMB60KpZcCdCviL0kw/s16000/MX+Tools+-+RT+Diagnostic+max_users_watches.png)

Linux uses inotify by default in Linux to monitor directories for changes, to know what value is on our computer we must put in a terminal:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

in MX Linux 21 32-bit gives me:

8192

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGrr7lMNGLI5jwRy7aWzPrX8md_8sdBqAhsusFWFr7oQr772FNwgFGeahEqPRNmy00jUKpnAppRLuXuSh5ShoH5BLhQ0hBdeju6TRYXCj2dF0cJAQQWvMZeqZea-MRhwj2VPhmdUOdgY4/s16000/20210928-102448.png)

Linux system limit is configured by default on the amount of files that can be monitored. For example, the notification limit we see is set at 8192 in MX Linux

To change the value in the operating system and leave it like AV Linux at 524288 we must put in the file we left open, at the end, the following line:

```
fs.inotify.max_user_watches = 524288
```

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjPrBTLGC1JGAkPW-4tS-x29Zww2MW1O_hbEM6MMqJx21rEoz1CwWURBs6aP_1kRkToyjzE-j8UWPqMM1pXvXXt3NkRF0a3i1OawYaR_4H09ZCg36LtVsY0F_Lwf2SKSUaqnU4wQMloPQ/s16000/20210928-103641.png)

save and close

then put in a terminal

```bash
sudo sysctl -p
```

returns to me:

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiohrvbAg0y-0BmSI-peD0UWoLvhwx3chwt82H7tRfwBIOIylfU5eb8P7LRhGxzZKOedDI8ZBfwMvV4KFI2_GuT7quq1T-sPSeORsaLCFagZI4ikFla-dkY2pYDMDWs6L2aXPt-0eTf1UI/s16000/20210928-104212.png)

which means it's fine.

**RESTART THE COMPUTER**

If you're curious and want to read more about this you can read (use Google translator):

**Increasing the amount of inotify watchers**
[https://gist.github.com/ntamvl/7c41acee650d376863fd940b99da836f](https://gist.github.com/ntamvl/7c41acee650d376863fd940b99da836f)

**Generic Kernel users: How low can you go, and under what load**
[https://forum.cockos.com/showpost.php?s=380ff3a18229522dd58c72a4e829e674&p=2464865&postcount=6](https://forum.cockos.com/showpost.php?s=380ff3a18229522dd58c72a4e829e674&p=2464865&postcount=6)

[https://forum.cockos.com/showthread.php?t=255727](https://forum.cockos.com/showthread.php?t=255727)

---

### Scanning Real-Time configuration on my Computer

Now if being in the terminal in the place (whatever it is) where I have realtimeconfigquickscan I put the command and launch it (or if you had it open just click start):

```bash
perl ./QuickScan.pl
```

and when clicking start everything appears green (**Remember** that for the changes we've made to be recognized we need to restart and choose Real-Time Kernel in Grub Advanced Options, otherwise the options we've configured will never appear green)

**Note**: The next screenshot is on my computer:

ASUSTek Computer INC. LEONITE Version: 5.00 Serial Number: MS1C6CS29109829

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0_wVK6i64A-WT155zdRWcnMn_p6sB0L9ZVjls-3BjOSzNiZ_whyphenhyphen5sqF3wjtlOsoa_qNzyiRBWyLbRvU0Re2XkJ8dWn2dgCyutR4edNGqILN0I64SIfKLf6Y_2s9qevbCfPQmaggvJWNU/s16000/20210928-122126+realtimequickscan.png)

The next screenshot is the QuickScan check in Kernel 5.10.0-28-rt-686-pae from Debian repositories in MX Linux 21 taken on March 14, 2024 on the same computer I could assemble thanks to my cousin Paco gifting me that Mainboard:

ASUSTek Computer INC. LEONITE Version: 5.00 Serial Number: MS1C6CS29109829

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0lxkRMh_SwGNhiBfz1u0rU8wj9hhN7amdZyUocGVWOHcVkqP88pGFq0idT5ApdHqPGsK5ryjBh9HkaVTiVEyI3NmaVWa61_hEWTpCxhSp0nscBe7WwT9MV4abZz5RbSk9wfUKZoL9e4nEKDlZ9BLWjPVUdkNheDwC-WZoR4BtdiQZtGjUEc6VQGoW7fg/s16000/20240314-203949%20el%20siguiente%20es%20el%20chequeo%20del%20QuickScan%20en%20el%20Kernel%205.10.0-28-rt-686-pae.png)

it's with the same configurations from above, don't know why it says it's configured without using SWAP anyway it says it's fine.

---

### Scan on Debian 12 bookworm with Real-Time Kernel 6

As of May 23, 2025 on Debian 12 where I installed the RT Kernel (mentioned above), when I put:

```bash
uname -r
```

gives me:

```
6.1.0-35-rt-amd64
```

I'm missing:

"kernel support for tickless timer"

![Image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHK2OQnh1m4g2-WHJ_t66M-lVqt4hRvPe6bk2JugvSJeB2QFlMBhetOQs5e24Lr5RfbeMftsRCCOtkU-kZ18gw62jkuXjZ7Ato6FBf-mjUHZBNu3_qoZlATgzvzoVM0VZBHa41dGBYQaPZsHM-My10ajIsVQLvvgk1JWoopGnUv2S0fgxv-B8u1tmne_M/s16000/20250523-235942%20quickscan%20not%20good%20tickless%20timer.png)

that can't be solved, but you can still work very well like this.

---

## Configure QjackCtl to load Pulseaudio Jack modules with pajackconnect

This script pajackconnect used AV Linux 2021, we'll use it here

### Dependencies of pajackconnect

```bash
sudo apt install a2jmidid
```

### Installing pajackconnect script

```bash
wget https://github.com/brummer10/pajackconnect/archive/refs/tags/v1.0.tar.gz
tar xf v1.0.tar.gz
cd pajackconnect-1.0
sudo cp pajackconnect /usr/bin
```

put your password and pajackconnect will be installed in /usr/bin

you can close the terminal if you wish, or put cd .. to go to previous directory or cd to go to HOME start

you can also delete that folder since we don't need it anymore

**Note:**
I installed that version from 2022
[https://github.com/brummer10/pajackconnect/releases/tag/v1.0](https://github.com/brummer10/pajackconnect/releases/tag/v1.0)

because it's the one closest to the MX Linux 21 release date
[https://es.wikipedia.org/wiki/MX_Linux#Lanzamientos](https://es.wikipedia.org/wiki/MX_Linux#Lanzamientos)

also it's the only one in Releases at least for the moment (I imagine this must be a stable release)

# Integrating pajackconnect script into QjackCtl

Open QjackCtl and click "**Setup ..**":

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijYfyzYRctozTwIa15YXe_2LoVaanJvOQecoxpwTai2E74gVXUguEGKH-_D93tkh3f6KWkat1Ht33b7fMFioN9jZ3TUAkJOb2razEx1ojLGJpQMXbf9iHfwETt0MmPfFdpV0Ok0Or8i5A/s16000/20211001-091025.png)

click on:

**Options**

and check these three boxes:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNvSTS696SCaBmVzgv67mlMpa-fP3OpkrJkJXNZmv49k3m06MkP71tB2uh_V3ILtyB8YxRKvaNCCiMQdg3guDlqpylmjb2KzdiCVB-tMO8GV2UqUjWew9-HNn0-8Is-JsM8s1ikwx9_sw/s16000/20211001-091234.png)

and there add in each of them these three lines:

```
/usr/bin/pajackconnect start && a2jmidid -e &
/usr/bin/pajackconnect stop &
/usr/bin/pajackconnect reset &
```

you should have it like this:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEik7VDLHk094hWODkPniNnlDm00BhpNt5sHN_K8SfXI1U1d5Kj0wIt_zDVdDvqY-j93YoLIZTI3PouLSnS4EWUInLcY6XojViFDFrGAw8G1MeWXxThsm6dexCByUUySiQF3CXwuU5esuFY/s16000/20211001-091451.png)

and close

Now we have it installed and configured.

---

## Configure MIDI in QjackCtl

In QjackCtl click Setup:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaHCd5D5-dWvyI7rT8t_DoxRJQ-Lz7k7lh-rXXkHfFrk-kXF7XQnI5RGpq0VxGiXK1paENlUNyfgOPnBmFaKuJqdb1mdvpp9wJ3vrdrocokSHtTd0GXKu-VyZi6bMUKkmUS7GNO6rZ8cfcDastP-BnBMlfuGmZ2QeGDTomqSak2l1MBEy7AXXb0xV55I0/s16000/20240524-174022%20setup.webp)

in seq:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtWMEcBNEUNPmSga5vJRa7NdPy-jkE8OYm8AJ1PgDl02XYU3Sg6uz0fNB1TNDYcVBE8ZV-zBUu75UEf_P_Em9y2p8OF_4sjp3o2mUwQBkUFLkFKPBJvabW_11C8EfZwK0jaGoNT6c1y3iIYT1-whxOLZA4ez_qmCagEOm2csQpMUnD98EmeLjuJ0Pn5Zw/s16000/20240524-174322poner%203%20y%20poner%20seq.webp)

by the way you'll notice latency says:

n/a

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijQMPBqz0R0PULFVlxp7BILMeKwBYJRCBim-UZivvKyUWCbzzUFkTw3YMgae718EJarx1VAT34GPzrhXqlm-_yyn5J4-JtVtDeB6DpEY6bw8H7jjeg2zyifgqjE2vBA02PR0J-dvQ2a1zBsAFK5RS4MMc7RDjLK1w9KY5Ez_TBr880CZKXDMKznQ-3g0M/s16000/20240524-174602%20latencia%20no%20definida.webp)

meaning undefined, to show us the latency we're at we must choose values from:

Sampling Frequency: 48000
Frames / Period: 1024

which are the values from AV Linux 2021

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8rzNl1RxLuIvHHDiSi39QvXcOLTe9uQ8PQUUY5Z2mGhO5iMAJSqd_PuVbU_svQ1M4ZkUgelWRiVZFa-aq0LWh3KG_Sc6X7KkvY22BRQeKmEI0nRfZ0jBz32y-BI_hO5FpZ7vw_dghEfi3qrS8K6chGA-BOWTov5_DhcG0_YfENubaReK-JmlKXe7tdDQ/s16000/20240524-174839%20puesta%20la%20configuraci%C3%B3n%20por%20defecto%20de%20AV%20Linux%202021.webp)

gives me 64 milliseconds latency, meaning that's the delay. Click **OK** and **Apply**

---

## About Sampling Frequency

In Sampling Frequency I put 48000, but if you use audio at 44100 on your system put it better to that frequency so programs like Ardour don't have to convert from one frequency to another because that takes time, to see what sampling frequency your audio has right-click and open with Mediainfo:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirJX3qVNNGiPpIC4Sg9BfYJ6g5qrOWWaw0vUnen5GYvFFMof4p4otu6erFwXQoUl9JAYxjLkCG_yOV_z1Issl1D1Y88nxm_LnfneJwaU2-K4Af3f8VpU_KiZiLQEtZ5BZ3ddOzt7kiW6QK44g-qY84Qv96vvT3lrXtEkzIwD2Avpcct_ykQfojXhum0do/s16000/20240706-191243%20abreindo%20un%20audio%20con%20Mediainfo.png)

and you'll see:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ6CLC0pDlKbsfAhdenimSgh-Co-OsGzMOXv8U9r4IIrFjP3eBRlgIwx0153UtQTTingQwkmhE0e2m6NKm8o9nUqxKRp5GO_kdV4LyoDvF04BtB3PoaOpSQk_-HFqy9Aqzt2T2ipIvnI_p0sY5qtinac_bJcauCG5fonU5sMDcGr7DGLUVOIT52Mj-v1o/s16000/20240706-191043%2044,1%20es%2044100.png)

in this case I'll put 44100:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGKZDZotRvX5kavfpXeCA4PHtD5pFNq9uilhJ_oCKViKhwgDH7Qw_MYrWaSGqkzvUJ8cj7mVohd0-5MacJXcbTa3IWh_JhkIt_uVXfOuYu7FLFwN4R_23Fzf-irFHpGZTCgjEh0lIql8CfaY6NVm8lS67p6FjO2vFUPAUDsMPH3tglMwFa-vkPsXxbVVo/s16000/20240706-191442%20eligiendo%2044100%20en%20frecuencia%20de%20muestreo.png)

because I'm going to load those files for example in Ardour

---

## Other ways to connect Pulseaudio Jack modules

Before I had other ways to make it work without using pajackconnect but I removed them since they're no longer necessary, but if you want to review them, I put them in a document on Google Drive:

[https://docs.google.com/document/d/1JFM3qhF_FG9gMUHLVURTODmAQok3jGxoP8ubJIDVmBk/edit?usp=sharing](https://docs.google.com/document/d/1JFM3qhF_FG9gMUHLVURTODmAQok3jGxoP8ubJIDVmBk/edit?usp=sharing)

---

## If you're curious about MIDI Driver configuration to seq

If you want to know why I put "seq" in "MIDI Driver", I found in a MuseScore forum the following:

[https://musescore.org/en/node/52876](https://musescore.org/en/node/52876)

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdkpwb7Wm9dFKIe1PJDV7zeG5e-HsONNYLkazG9NbMPTF3cOwXwcpMxZVejNAdGOEs9PoZ3XXFr_YTSG9BLD6qYNkq1LGsUhFKctnpwnIYtT5wTzKObwmclGlv4vX1DkRFIcA_Kcxqwpo/s16000/20211002-094304.png)

translation is:

> Hello,
> I use jackd for my music programs.
> I have a USB midi keyboard (Korg nanoKEY2).
> In qjackctl, I can't connect it to MuseScore to enter notes. In fact, the midi keyboard appears in the "Alsa" tab, while MuseScore appears in the "midi" tab.
> So, I can't connect the keyboard to MuseScore.
> How does it go in this case?
> My Musescore version is 2.0 and my operating system is Ubuntu 14.04.

best answer:

> Just in case anyone comes across this issue: I was experiencing the same problem with MuseScore 3.1. I solved it by setting the MIDI driver to 'seq', then in the ALSA tab in the Connections dialog I connected my MIDI keyboard to MIDI Through, and then in the MIDI tab I connected system to mscore. See images below:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtdb0cLC-WIqIWfx9gdgT7YNDzZaS39QNrKuQs-YTSQ4Z1DevQKPZOTtL2Jtx0NYTZmr2mfYdCEqc8Xcm7T5oRMNI1gZJY2aLV6dopnVNmBCqZ4SMA_o-cmazj8iK1b3efw_97H1ZmigI/s16000/20211002-094618.png)

translation would be:

> In case anyone encounters this problem: I was experiencing the same problem with MuseScore 3.1. I solved it by setting the MIDI driver to 'seq', then in the ALSA tab in the Connections dialog I connected my MIDI keyboard to MIDI Through, and then in the MIDI tab I connected system to mscore

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0Xo2Ik6yzIhWz5Z5Cc3Ngk_ZD2B_7lgIGr__J0JvxnjlHO5mzNpPepX0j32eA1qMca2ZWL0LK-OpeEp36k_vaMku9tPBehm1CZEIQ97N678NdShyphenhyphensCNCH3vOpoWSyP4-u91HA5nN_KFY/s16000/20211002-094944.png)

**Note:** Things appear in the MIDI tab because the a2jmidid package is installed.

now, you have QjackCtl configured like in AV Linux (AV-MXE) 2021

---

## The new graphical interface of Connections in QjackCtl

When opening QjackCtl and clicking Play and clicking the Graph button in these images you see the new interface that comes by default from MX Linux 19:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4QwVqq91fUio8WGrvx1Q0VE1_1K2d1VHM9noU5-kU8FUARHMhAvBdg4wnXeLtfAYZfuY5df6Ed2wHR9V248QbOEfaM4q3FA0tzOO8-_SI2x0mDVbCLCcfv5LvEfU20k9AEfQUZ9wP1Mg/s16000/20210319-093119+Jack+Audio+Connection+Kit+iniicado+%252B+Graph.png)

but I don't use it, because I don't know how to use it. If you know how to use it use it, I use the previous one (there are more tutorials with that), so to deactivate it and use the old one, click on the button:

**Setup**

and click the "Other" button and uncheck:

**Replace Connections with Graph button**

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCDdxXovI4seV0N7AB5-U0PLV9oezDG948zwgINoLruboqOsdzGRNtNLKirINM40Xjn0pghcrZrww83WQK9vYC7jj6kpiLXoVRTwpu_aOo7G9ciQidMA-c7mdV8SiFKp4zoOtGYxaZKsY/s16000/20210319-092552.png)

Apply and close

Now it appears:

![image](https://blogger.googleusercontent.com/img/a/AVvXsEiyZB0Qi8gSS9vckruMlCuXhDZkq4iqY_qN9quT6C5P-W2RID6-RCBS6PPCsevJ0YYd9hiBz4D8fKXl6EXBtfJRXqc_ZCNaw2mYS7BHRLe_xrWCQkWgsvhVq4xxCSRG5-odyEeHOG89BfOnzxuFBTAIHHxgHEbyoPxs7-nxypzUfzMg9q2RgAl952gX=s16000)

**Note**: If you want to use the old one revert what we did.

---

## Starting QjackCtl

Just give it Play:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSY5hRFn_Mq9qOWhcTGKbw47heLyGDBqPPI2idz9wpcGr7X0uxc0RKOu0sRp6grbtZYJwCRDCYeeQTbeM5Zc8Rh2yRZa40jYwuqCkPk5KsKQQSjheCJMMc_C56su9R-2SWE6V2bYCMYxw/s16000/20211003-213050.png)

---

## Tip: Don't suspend your computer if using JACK with QjackCtl

By the way, I'll tell you that pajackconnect has how to install a script for JACK to work well in QjackCtl after Suspend the computer:

![image](https://blogger.googleusercontent.com/img/a/AVvXsEhTGiU60fcvVH4eAV3rP9fvhFZ12Fy4_7lplq4uwgTIyCca-bXm2n4Im8piKDMpVdL8IGy2e3hygz6TW8XG2-9PG0AT8p5VD-_AauqLMHlFrT3nO_P3WNJ67N-bUrD5X5XASFiS9PiDa8LXBvtA2XvjiXhc6_M-YMvvCpnnp0yePo8GL5mXYenrDomT=s16000)

but I've already tried and it doesn't work, so the best is not to Suspend the computer if using JACK with QjackCtl in this installation we're making using pajackconnect (if you want to suspend, stop QjackCtl in Stop and then suspend, and when you take the computer out of suspension and want to use it again give Play again)

Regarding this you can read what I was writing in the following link:

[https://docs.google.com/document/d/1rZqdpbVrnweaP-ZUCc-OJFaIIoe8qmh25HBZ5RgXIVg/edit?usp=sharing](https://docs.google.com/document/d/1rZqdpbVrnweaP-ZUCc-OJFaIIoe8qmh25HBZ5RgXIVg/edit?usp=sharing)

---

## Tips for playing QjackCtl

As I told you, the best is to **restart** the computer so when playing, the pulseaudio Jack module appears as it should. When you've logged in then give Play (Start):

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpBedrtxqf3LyN98Os82HZX5rolUNqSe9gbft613CSK2Q9FbzFnW6mp6H_9vbRjR5XbYclIqRifMf_JuSiOGnI292ETcpr3V7TogafFcLprlK08tZoWxjKSYq85XPmdFqn9BoLlW9GDRk/s16000/20201005-125102.png)

and correct, as you'll see in the following figure everything is working well:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggn8qrp-Jg57nJc8tfojc_m_gxQnGJmMSr3YIDXw38QYhQ-r_3PqaSN8xROcS2m_7Ot6FrqlhbQUYO8w6TiPeLkdL4qHps7clr8jG2GCHdD8QZfxraAZf6joOdlSEuQPE_ebbEmeXe4f0/s16000/20201005-131237.png)

the PulseAudio modules are loaded and working correctly, I can also verify how the is working in ·Messages·:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdNzn9P58rc4xmfNI_nNST8SiSPjXNEt5Th59k4BH8OOWvAWaXoygeL46sKzZqLPzLWYlAQ7z9l_qpf-xQiAT_p5ftpA8p2Og0wOGoTgMJOzcAqeNkFleP8iKwbG3IPvUU05pES7cvTgg/s16000/20201005-131610.png)

This in my case, as I told you, you in sampling frequency could use what comes by default 48000 and in Buffer Size I changed from what came by default and I have 128 because I want to use it to make Karaoke and when I sing I can hear myself in the speakers of this laptop at the same time I sing (only sometimes a hard drive message appears that says writing has slowed, well, to improve that I'll later use a solid state drive which is faster).

## When opening Ardour choose JACK

When you open Ardour and are configuring it click on:

Audio System

and change:

ALSA

![image](https://blogger.googleusercontent.com/img/a/AVvXsEgn037ASoPlC_qzFWc5ivV--9FHgTJOmxykklWb0TAWmocjbYEdFOCE33w2Z1hyYYz_PJSS_XvgcZqqvpvSYEH8W9ydXRdmmWJwztZ7uMOyBvuNGscukOh26QKSIvKAQhz0VJGo7njSE50RXwz7zGALbKZwjXIM4RQ8PM_9uCCad8JVzt5VKn1ekzjD=s16000)

to JACK (supposedly you've already given Play to QjackCtl to do this), like this:

![image](https://blogger.googleusercontent.com/img/a/AVvXsEhzNocWQ5r9OFd9IcYQLhtIBh4PNqhiH3DhYSbQWVpqmIXLMjva6hPSPA_VExMaheSeWeEpwX-cmFoUSYyXPh6BnPG4OR71U_ouliPMA0IC88e4G5OiJjj0Wn61zpBhiqqHKmC92mVm_sEp3ofR5bh450tMQEZ1a6vd7BN1-UfIdwv5oBJ1Zn4HErTv=s16000)

and click on:

Connect to JACK

![image](https://blogger.googleusercontent.com/img/a/AVvXsEg1ksDoMTKbUvAqM35oDsXOwZvLJx_spMTpTa4CIQWj21TRwTsBphNrRLdP541JSkeJTNYOmPR02poD3NIMiZibGV9ndNMpQL92qbwtEdQQd2qOmyRI6ue39MUKlbtM6Xhdzncqk92oZ8E9NKq8PIXkJ1pNZ09kHcIE74V0jbtoRLQxRHxIW85Wnt7q=s16000)

ready

## UbuntuStudio Audio Plugins

In Ubuntu Studio 20.04 LTS (April 2020) the following plugins were installed:

```bash
sudo apt install abgate aeolus amb-plugins autotalent blepvco calf-plugins \
     caps cmt csladspa drumkv1 dssi-host-jack dssi-utils eq10q fil-plugins \
     fluidsynth-dssi foo-yc20 ghostess hexter invada-studio-plugins-ladspa \
     invada-studio-plugins-lv2 ir.lv2 jconvolver lv2vocoder mcp-plugins mda-lv2 \
     omins rev-plugins rubberband-ladspa samplv1 swh-lv2 swh-plugins synthv1 \
     tap-plugins vco-plugins vocproc wah-plugins whysynth x42-plugins zita-at1 \
     zita-lrx zita-mu1 zita-resampler zita-rev1
```

**Note 1:** From this list I removed a package called "blop" because it uninstalls Audacity. This list I've tested on MX Linux 19 and 21, in case in a higher version some package causes some inconvenience you must remove it (or on another type of Linux)

**Note 2**: I made a separate tutorial about [how I got this list](https://facilitarelsoftwarelibre.blogspot.com/2020/10/plugins-de-autio-de-ubuntustudio-para-mx-linux.html).

---

## Plugins with modern/usable interface (DAW-like)

These are the ones that **have decent GUI (graphical, sliders, visual)** and are worth it:

## 1. Calf Studio Gear (calf-plugins)

* ✔ Highly recommended
* ✔ DAW-like interface
* ✔ Graphics (EQ, compressor, etc.)

✔ Includes:

* Compressor
* EQ
* Reverb
* Synths

👉 Useful for complete mixing: equalize, compress, add reverb and create sounds.

🎧 Example usage:

- Remove annoying frequencies from a voice (EQ)
- Level guitar volume (compressor)
- Give atmosphere to a praise (reverb)

👉 **MOST IMPORTANT** on the list. **Installation** with:

```bash
sudo apt install calf-plugins
```

---

## 2. Invada Studio Plugins (invada-studio-plugins-lv2)

* ✔ Decent GUI (not too modern but usable)
* ✔ "Analog" style

👉 Useful for basic audio processing with analog character.

🎧 Example usage:

* Warm up a voice (saturation)
* Adjust dynamics on simple tracks
* Quick mixes on modest equipment

👉 Very good for basic mixing. **Installation**:

```bash
sudo apt install invada-studio-plugins-lv2
```

---

## 3. x42 Plugins

* ✔ Modern interfaces (Qt)
* ✔ Very used in mastering

Especially:

* meters
* EQ
* professional tools

👉 Useful for analysis and precise audio control.

🎧 Example usage:

* Check exact levels before exporting (metering)
* Analyze frequency spectrum
* Fine adjustments in mastering

```bash
sudo apt install x42-plugins
```

---

## 4. eq10q

* ✔ DAW-style graphic EQ
* ✔ Very clean

👉 Useful for precise band-by-band equalization.

🎧 Example usage:

* Remove unnecessary bass from microphone
* Highlight clarity in voice or piano
* Adjust final mix

```bash
sudo apt install eq10q
```

---

## 5. zita-rev1 and zita family

✔ Simple but usable interface
✔ Professional sound

👉 Mainly useful for reverb effects and audio utilities.

🎧 Example usage:

* Simulate a church or auditorium (reverb)
* Live mixes with natural atmosphere
* Signal processing in JACK

👉 Not "pretty", but serious

```bash
sudo apt install zita-rev1 zita-lrx zita-mu1 zita-resampler zita-at1
```

---

## Plugins with basic GUI (not modern but usable)

These do have interface, but:

* very simple
* old style
* not visual

---

### synthv1 / samplv1 / drumkv1

* Classic synthesizer GUI
* Quite functional

👉 Useful for creating sounds and virtual instruments.

🎧 Example usage:

* Create pads for praises
* Program electronic drums
* Simulate instruments live

```bash
sudo apt install synthv1 samplv1 drumkv1
```

---

### ir.lv2 / jconvolver

* Heavily used for convolution

👉 Useful for applying impulse responses (IR).

🎧 Example usage:

* Simulate acoustics of a real church
* Use guitar amplifier impulse responses
* Ultra-realistic reverbs

```bash
sudo apt install ir.lv2 jconvolver
```

---

### vocproc / lv2vocoder

* Functional interface

👉 Useful for processing voice with vocoder-type effects.

🎧 Example usage:

* Electronic effects on voice
* "Robot" sound
* Modern music production

```bash
sudo apt install vocproc lv2vocoder
```

## Note: some plugins may need restart

Some plugins may not appear immediately in Ardour or QjackCtl.
If this happens, restart the system or rescan plugins within the DAW.

---

### swh-plugins / mda-lv2 / mcp-plugins

* Old interfaces (but functional)

👉 Basic effects (echo, reverb, compression)

```bash
sudo apt install swh-plugins mda-lv2 mcp-plugins
```

---

### fluidsynth-dssi / swh-dssi

* Soundfont synthesizer
* Useful for midi playback

```bash
sudo apt install fluidsynth-dssi swh-dssi
```

---

### amb-plugins / tap-plugins / vco-plugins / wah-plugins

* Special effects
* Modulation, delay, wah-wah

```bash
sudo apt install amb-plugins tap-plugins vco-plugins wah-plugins
```

---

### caps / eq10q /

* Classic audio processing
* EQ, reverb, dynamics

```bash
sudo apt install caps eq10q
```

---

### guitarix / x42-plugins

* Guitar effects and professional tools

```bash
sudo apt install guitarix x42-plugins
```

---

# Plugins WITHOUT interface or very basic (avoid if you want modern GUI)

Here is the big problem in Linux 👇

👉 Many plugins use **LADSPA**, which:

* Does NOT have real GUI ([Wikipedia][3])
* Only host sliders

## ❌ From the list (no modern GUI)

These are the ones without friendly interface:

* amb-plugins
* caps
* cmt
* mcp-plugins
* swh-plugins / swh-lv2
* tap-plugins
* vco-plugins
* wah-plugins
* blepvco
* fil-plugins
* rev-plugins
* rubberband-ladspa
* abgate
* aeolus (separate interface, not modern plugin)
* autotalent (very basic)
* ghostess
* hexter
* whysynth
* fluidsynth-dssi
* dssi-*

👉 These are:  
💀 old  
💀 technical  
💀 no DAW-type GUI  

**If you want to try them**

```bash
sudo apt install amb-plugins caps cmt mcp-plugins swh-plugins swh-lv2 \
tap-plugins vco-plugins wah-plugins blepvco fil-plugins rev-plugins \
rubberband-ladspa abgate aeolus autotalent ghostess hexter whysynth \
fluidsynth-dssi dssi-host-jack dssi-utils
```

**🗑️ To uninstall:**

```bash
sudo apt remove amb-plugins caps cmt mcp-plugins swh-plugins swh-lv2 \
tap-plugins vco-plugins wah-plugins blepvco fil-plugins rev-plugins \
rubberband-ladspa abgate aeolus autotalent ghostess hexter whysynth \
fluidsynth-dssi dssi-host-jack dssi-utils
```

---

# 🎛️ Modern plugins for Linux (outside Debian repositories)

Since these plugins are not in Debian repositories, when you download them upload them to [https://www.virustotal.com/](https://www.virustotal.com/) for analysis

## 🔹 LSP Plugins

**What it does:** Professional audio suite (EQ, compressors, limiters, analyzers, etc.) with modern DAW-type interface.
**Download:** [https://github.com/lsp-plugins/lsp-plugins](https://github.com/lsp-plugins/lsp-plugins)

---

## 🔹 ZamAudio Plugins

**What it does:** Mixing plugins inspired by real hardware (compressor, EQ, reverb) with friendly GUI.
**Download:** [https://www.zamaudio.com/](https://www.zamaudio.com/)

---

## 🔹 Dragonfly Reverb

**What it does:** High-quality reverbs (hall, room, plate) ideal for mixing and atmosphere.
**Download:** [https://github.com/michaelwillis/dragonfly-reverb](https://github.com/michaelwillis/dragonfly-reverb)

---

## 🔹 Cardinal

**What it does:** Modular synthesizer like VCV Rack inside the DAW, very visual and powerful.
**Download:** [https://github.com/DISTRHO/Cardinal](https://github.com/DISTRHO/Cardinal)

---

## 🔹 Odin2

**What it does:** Advanced wavetable/subtractive synthesizer with modern interface.
**Download:** [https://github.com/TheWaveWarden/odin2](https://github.com/TheWaveWarden/odin2)

---

## 🔹 Surge XT

**What it does:** Complete professional synthesizer, ideal for advanced music production.
**Download:** [https://surge-synthesizer.github.io/](https://surge-synthesizer.github.io/)

---

## 🔹 Vital

**What it does:** Modern wavetable synthesizer (like Serum), very visual and powerful.
**Download:** [https://www.audiopluginsforfree.com/vital/](https://www.audiopluginsforfree.com/vital/)

---

## 🔹 Airwindows

**What it does:** High-quality mastering and mixing plugins (no graphical interface).
**Download:** [https://www.airwindows.com/](https://www.airwindows.com/)

---

### Scanning plugins

These plugins I need for **Ardour**, if you had already opened Ardour and scanned plugins, scan them again this way, click on:

Edit/Preferences

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcY8yrmq-stCNgPFoeBVo2fkb_IUnEJJ5PV3cSmX9pGzoJYZEzP_o3_vm_MwtWMM8xYAxYq-CdVVjMO0X7gkqdyJdRigTaDf6khfpw8p688do1Qo0xN5T6W41DPc-VFP-ViFdP498UeEc/s16000/20201006-111013.png)

there click on:

Plugins / Scan plugins

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit_Z_dwwf-Tmsx00BDt9hltOUbJ_Drc2qWirl0URLy9aATzUF6SmQ0D1-UhirD6zk09y-XfamcayKEtQR8sAH1JFwW_ZkljvU266lW6HixUFhUwnrTMZPmWJnwFVo9TOHhx8mbE3-2bMU/s16000/20201006-111111.png)

to exit that section to the previous one click on "Editor"

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioAHSVLlnc6bQx1E5DERDHlpgVYq6IFbx3ml5ioDsDLIpc6l5Hy1gjoyYLikZHMsarWJ441_wEzFQGbe0On1H5YcDTvSiz_owFeXL6MlVt2EkWOoIDwC1WSrVp4wYqXOnv9PP-mM2Icmo/s16000/20201006-111328.png)

### To add plugins

click on:

View / Show Mixer in Editor

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLNFl8hC0PYxKP1zZ1utibkjBJz57gK7KXP7C11Rt9DoxKDxZMrEZHjDc2JJ6UJ6-8vI4EGWz5eu4zh03Hv9ORp0oeQPQEmckKuB7Q_FXA7gsFnX1p9KClEWOnfQQh8mZGe0uTpB6Jfoo/s16000/20201006-112103.png)

Before adding the plugin select the track where you want to add it, for example I have three tracks loaded and I'm going to add it in the second, you have to click where the arrow indicates:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjyYefuxYZuxS3jJ3oDA7VvAsr8dmXDIT0rXnhOEcOnsOMGKOmld6Tout5J4WBWc_j6bXOCKMrBHDQDfBqx-0XdZjrhJ_wUgf2kAaQi7PaeGLZwHoV-iLeb41Oyh1l5wjjdkUJsQ2DmNOw/s16000/20201006-112606.png)

now, there in "**Fader**" you can search by author or by category and add:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpRR9fQ5JJFEfQCVymAkfWYIzqhlK8fDm-Np5j4KduKFLFyeKfGZH1ZiqOWRzbKB2HfFwJofwlVpqNjk-Y6w4GxoIX-u_6tVIe7CsyDYDkF07iWAGMWR7j2v_Y4oFpyoL2kRgFExVvH7M/s16000/20201006-112304.png)

---

# **How to connect MIDI devices and have them recognized by JACK**

For that it's necessary to have installed the a2jmidid program which we already installed above:

```bash
sudo apt install a2jmidid
```

if you have used the pajackconnect script used in AV Linux (mentioned above) skip this step by putting in terminal:

```bash
a2jmidid
```

now, in the "MIDI" tab of QjackCtl the available ports are, for example the following image:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHzRcuBiih9hmmC_FtkyNt7EL7iDi5OXtlh65lcgz-Wd5f8QlfPxS2SwBN8Qc75CgPnq-8BWopyaFA-maFx_DGePeaW5ycEO0zp5tyuu9AtgP7QnT28CVhSjtGgmhPyUKMBTE3-hxSe_4/s16000/20211003-223230.png)

now we're going to connect a virtual keyboard, whose package we already installed above, but if you need the installation command it is:

```bash
sudo apt install jack-keyboard
```

the next would be just like what would happen with a real keyboard, it's to be able to do a simulation of how it would be done in real life, because when you connect a real keyboard it will appear in that tab. To open that program put in a terminal:

```bash
jack-keyboard
```

or search for it among all your programs. In the following image it's in xfce4-appfinder:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5b-KkxWSMSbdM0tFFZG7buisI9Wyofsi6krIiiqqOKA11Qu3DFErUSpYCLvzRfegic2AUZMYJCOLkfhejOpSLdBU7uvPOvKq6WdbkSQnN5ILxMv3z_FtQnyKQu2sMaeMu_T41v_Att9o/s16000/20211003-223528.png)

and here the program:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC-SxaRg-3viPOJ0-uZP2-0P2eeYJcwuG7BsdesLdqHXlopCHToDDC3tgpihfX3HSTk2Y5OwntIexq6Q2wGywnTga4qbPXsr1PrI0bZiY8gknID2EiI7jswtCp4_cULUfQseuqpc2_NsM/s16000/20211003-223814.png)

Also we have to open Qsynth (we already installed it above) but if you need the command to install it is:

```bash
sudo apt install qsynth
```

where I've loaded a SoundFont sf2, which we already installed above, but if you need the command it is:

```bash
sudo apt install fluid-soundfont-gm
```

the fonts are installed in:

/usr/share/sounds/sf2 

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhISHUINnqnvz5PqBjL98omlBQpnB5K4IXoEKfCOeV8idJ2Ejxrl_L4Ay_8b6U6f4EDE8ZApAX8eH8cBxI0Qlxu5w1fzZMOHiYUkkYyOVUhwyOSFtxedy1srVhMh4026NV-1Q3eW3XZHg/s16000/20211003-224044.png)

that sound font is so that it provides me with virtual instruments and be able to reproduce them and listen to them when loading them in Qsynth. 

**Note**: You can also load other sound fonts

### Loading the sound font in Qsynth

If you don't know how to load one, it's done like this (they will appear because we've installed them), open Qsynth and click on "Configuracion":

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYS8bPr2pMgMSSosVhToeFL2bhIQ6yK46oTWJtWGtZznPFAjowfk9mQGTNUig4y5pMNko0ZFAoT4EyDMpGg9gwmUybsuqwR5OnXcOKLLaN01fFBUMnPdPLwP1vFW3_NFhGjZW7xtLsyJ8/s16000/20211003-222206.png)

and click on the "Soundfont" tab on the "Open" button:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0qaLxoyCmHgbbfT3DGImoydtJsfHrpJM1GU2jTG1CqhNLy9nSTwm-c8gOe4aBbzfR6MEOyS93sUG98Bbe4AXb8RIOM1SxtoMoKk0ntOpvVIdtIDZ3q9wpgnXkKx7bNq97Wp6lgmEVF6I/s16000/20211003-222351.png)

search for the sound font, it will appear there:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhM7Hjd3Mi093Nc8WxjMZqVP7b_70LSQlOW5o0b1B3rOmtNU3kyXQZp2rvVr0Xih-go0xWOjGYFgCwJvNXLHsqCRAEHMyCW5FbKhpnBy1qIOoiO2S9E7PLIIsKafvltpCBwTMVg_k6kPoE/s16000/20211003-222557.png)

and after clicking click on "Open"

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO5pWVco53qbSMV1Cpdo8TOr6Y6YzuiQJgdyfA29tUlSX-iy1Sv-0bj5Df_REXB4NlZHqmtiz1bZP1NC9MMi8TJNE0dnlyH7Dv69JvCFzvyJ6vnXUC7SnDqNkXXy6mj8skMAnBlrvErG0/s16000/20211003-222710.png)

and click on OK:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9jjx208OimY3iy5iGU2siibI7F260SqdT2ksxLGtWJBX1Pkc2rGYhbMJ2GR8XBgVhyIDQtqo4FSwLNfO3FRxJ4DWBaDs3tB4OLBBRoJ_nz7NbuqU901tI6SyHswYqLg2Cx3ELzcg8V_Q/s16000/20211003-222747.png)

and you have to restart the engine:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaGVqXnNzWDyhmgdmgTamloS3cyWQrJzFhiLS_gHOx2QLZCaiixZe0rOMmyfAO23bcodNbiQdgWYQlvJYMhLjclo6U02Fgsk-SqHx_4KChObHXF90IKT1QsV0KRfIiLe5AGtPlzRpE40M/s16000/20211003-222845.png)

and the sound font is loaded

#### Connecting jack-keyboard with Qsynth

Now in the MIDI tab of QjackCtl we have this and click as the explanation is there:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMqoPgNZAzrft3Hp_N0WcSv8_Mt8BoUDAHROjdkgJxEXGbpi4Js2YSobE_C9CGXYjJJzziTFPlhjjTJ6Dvp1DQwvKYngFF4fQHc44EAvCk6VnX4PqUg_J-REYyFTgRzxW58ymviTWxXkI/s16000/20211003-224510.png)

now it will look like this:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2f7rOwFJCgG0PZFrPpZZlLyEbH4fLQzTC2s_vfzzPoJtcE6URCmG7IqOwLwGWBS-Zj55tdHG4W7yBAxQ4xOHjGnPnYVqhFcPRfecGho8xVtAUWin5Gl5lmA5bzHGplQUIOo854-XP5e0/s16000/20211003-224651.png)

click on the virtual keyboard **"midi_out"** port (it would appear if it were a real one) and click on "**FLUID Synth . . . . .**" and right click and Connect:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhD6gLBs3EQhFjLe25p9f8PX-_xELhrpd1Xpjf-xLtwbYGC_bCcJvFH-f75_pe_k_eo01RztUYLAMUNJApjpG8O_sirijyx2XzkoM8dhcJ6W_rHcIejqE0VpuqpMb8yrF-nKomU2Z0z5OM/s16000/20211003-224944.png)

and it will look like this:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAAYRR5DW474uM116WAyfSx8L-NedbPIdFEUu319oy1RpjTIzHce9b9yaU2xZ6OpYKA7S5HPzqh0ZxfG9qcEpz8dYYzjD5uIv99-UU74U0nqLTcMENmBNPR58b1r8AMiuuVIi0IbBm-zs/s16000/20211003-225105.png)

now play on the Virtual Keyboard and you'll see it makes sound, but you can also use your computer keyboard

### Other Sound Fonts (sf2)

You can search more for them (you'll have to put them in some folder like Music and search there from Qsynth for the one you need):

**Free SoundFonts from Ubuntu, Debian, Deepin Linux and TuxGuitar packages - Ready to use**
[https://facilitarelsoftwarelibre.blogspot.com/2019/11/fuentes-de-sonido-soundfonts-gratuitas.html](https://facilitarelsoftwarelibre.blogspot.com/2019/11/fuentes-de-sonido-soundfonts-gratuitas.html)

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcgZ51tc-p0rGMhjRKK_ibP2DwbKh0JyQuL5PIsbhqW4ugG2atHSxc2CR3DxqOCQp0wSDSn5U3b_1AbO3z3_p8xsttgqOODlHBv3lVHw4Edymzj6YWfTeYIFOpktwlPVZVQgCfd0Q5fMY/s16000/20210319-115905.png)

**VirtualMIDISynth | CoolSoft**
[http://coolsoft.altervista.org/en/virtualmidisynth#soundfonts](http://coolsoft.altervista.org/en/virtualmidisynth#soundfonts)

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr763GK7IqlxmsRR2MX5MqG18RsoJsKj-EVD-4QDjdAJ6Hr45bXh2bOyzGypIhcemIuWtEEEa8kYLTz6WCUdOGkkgxDaAZQUdUBpwRbHpCjsgevWyPtEBvJyG48Tr38_yzeiB-uj2m79w/s16000/20210319-115534+fuentes+de+sonido+en+pagina+virtualmidisynth.png)

## Configure QjackCtl to make Stereo Mix (Optional)

The next is what I use QjackCtl for most of the time, for this you have to open QjackCtl and click on "Setup":

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4ONgrXa6UidPyPgGpZCbTIO5f6xTsSk9Ads-LRs-AqFsGCC_HGvzOzCRwuwDKWVVc67kbHFhARqmeYUqRVNgME26VIKsdvBTpzAWEhTzV1ST50ItWYOXlGe1AlV5Qei54adBXdT1_RBc/s16000/20201005-125320.png)

by default it appears like this:

![image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjATlioGgPMyIfirQxS7Nf_H5Ku0w_cK1QZKQH34diQj8mv1BsC_YZDM36nBXE3nk6WcCeiEpCmMbImv6KS_zS9za97JL3V3yO3QSXTweRoCSu6dYeON1QKaXjuRZjbvENWxiiGV2wNEbs/s16000/20201005-125408.png)

**Note**: The latency is at 42.7 ms

### **Sampling frequency at 44100 (optional)**

Most of the audio I handle is at 44100, and I'm going to put that value (in my case only). But this is optional, it all depends on what you're going to do, you can leave it as it was at 48000

### How to make Stereo Mix

I want to use Jack for Stereo Mix because I want to use it as Karaoke and listen to the audio I'm singing in the speakers at the same time in addition to making a video recording of all of it or just audio, for which I'm going to put the value of **128** in **"Frames / Period"**

God bless you

## BACKUP OF AV LINUX CONFIGURATIONS

I made a backup of the most important settings of AVL Linux from the 2021 Release here:

[https://github.com/wachin/AV-Linux-archivos-importantes/tree/master/AVL-MXE-2021.05.22-xfce4-openbox-i386.iso](https://github.com/wachin/AV-Linux-archivos-importantes/tree/master/AVL-MXE-2021.05.22-xfce4-openbox-i386.iso)

**REFERENCES:**

PulseAudio Modules
[https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/)

Linux HOWTO: Pulseaudio & Jack server
[https://forum.renoise.com/t/linux-howto-pulseaudio-jack-server/41434](https://forum.renoise.com/t/linux-howto-pulseaudio-jack-server/41434)

Configuring the real-time access for "audio" group users and applications
[https://help.ubuntu.com/community/UbuntuStudioPreparation](https://help.ubuntu.com/community/UbuntuStudioPreparation)

Ubuntu Studio PackageList
[https://wiki.ubuntu.com/UbuntuStudio/PackageList](https://wiki.ubuntu.com/UbuntuStudio/PackageList)

Ubuntu Studio low latency kernel
[https://askubuntu.com/questions/758106/ubuntu-studio-low-latency-kernel](https://askubuntu.com/questions/758106/ubuntu-studio-low-latency-kernel)

Installing Geonkick broke my QJackCtl/pulseaudio-module-jack setup for some unknown reason : linuxaudio
[https://www.reddit.com/r/linuxaudio/comments/is37tj/installing_geonkick_broke_my/](https://www.reddit.com/r/linuxaudio/comments/is37tj/installing_geonkick_broke_my/)

QjackCtl and the Patchbay | rncbc.org
[https://www.rncbc.org/drupal/node/76](https://www.rncbc.org/drupal/node/76)

Using JACK for lower-latency audio on Linux for piano practice
[https://kcore.org/2021/02/21/midi-jackd-linux/](https://kcore.org/2021/02/21/midi-jackd-linux/)

Example of audio recording under GNU/Linux
[https://aerilon.wordpress.com/2012/04/23/ejemplo-de-grabacion-de-audio-bajo-gnulinux/](https://aerilon.wordpress.com/2012/04/23/ejemplo-de-grabacion-de-audio-bajo-gnulinux/)

[3]: https://en.wikipedia.org/wiki/LADSPA