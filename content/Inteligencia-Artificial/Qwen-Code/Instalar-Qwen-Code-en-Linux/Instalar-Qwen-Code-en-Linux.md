
# Instalar Qwen Code en Linux

El comando de instalación está en:

[https://qwen.ai/qwencode](https://qwen.ai/qwencode)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjR_Wh-R65TbvNlZf3uj_V3D8_ZvSNX9TqlE72DXSKK5iaRR8iG4tw0SNhoPvZ27i9TbhNPS6IghbPoYXOiaXkjgaWwoUWGfXsp_V4C3t1z8WPy18K2Z7x6yDa3LStbYs6QgRjqJUZMBj5kEmRTU7h0k0i1m143cL0y9uAS0rJTD4xaT0dYhUFodxzqaVE/s1105/01qwen-code-install-on-Linux-macOS.png)

y es:

```bash
curl -fsSL https://qwen-code-assets.oss-cn-hangzhou.aliyuncs.com/installation/install-qwen-standalone.sh | bash
```

poner ese comando en una terminal e instalar Qwen Code

luego en:

[https://modelstudio.console.alibabacloud.com/](https://modelstudio.console.alibabacloud.com/)

allí crear un usuario la página tiene una configuración para elegir el idioma en inglés, y registrar una forma de pago, esa validación puede demorar unos días

allí elijo Singapore:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikS3oFnQgHPTTvuTZi3RqEte2ti5CfsqpKsWkRGwoZfwDtSkYmcTqymrOE4PPEYkifesw86RFFGqDPNxICm2tuZy0c11zzLCSsbsYp_TlPX4v3dbNXw_Etob_IA2ydZrNsZoiVeaUVTk2m9LgoyTIlfyvklEJmflF_Y1yul1ZuOMaFH_qZYZ9fcIBHCrw/s1600-rw/02-elegir-singapore.png)

y allí dar clic en:

`First API call to Qwen`

y luego seleccionar:

`API key`

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdr9nRgjVryPWFb6ePbp2qvSLQp8BodWHr_aRTxaP5KAmZm6WkEWAcBrFxGX4R5k08JK3JF9_FFmuUDQmi-cDza7WUwYIjcv0qGzdurOiur53pG5cg-5dZYZa_spxRSnIhAcYVfkss1bZpYV3FZ2JuM5ig6lJZe4qpxDTEkSNqZJVD5A2oWdIX8y9eyuI/s1600-rw/03-First-API-call-to-Qwen.png)

y allí crear una API Key, guardarla en un lugar seguro

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjeRVRswb28AUOMEa6VcDZsQMGnVhngG2vJXMDku6KwW-XrehMG4utOfGo5iIweBpqn4Y2xTpkV6E4lZs4RgZ-RKW4zSSbTPQePCntV-Z82GJr-Z0D5cgxCCundjNpqJBljmwCtyOyRoD_pL-W4qgY3exMswsWB7gSB6YBayIegNo1uHxkZgLyoP02tAIE/s1600-rw/04-API-key.png)

ahora poner en una terminal

```bash
qwen
```

y elegir:

`Alibaba ModelStudio`

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6Yob5g77UDmf16P2Fv3goMZhZEUFj7pUmaQZAsg0kZGbhL0TvERtd7xqUb_xlHFn76k115pr1G-p4kTWMY_P1KUVXXcgh2Jy3u7lgHGxITtQHOBF8wwOEIPVvT6oNUpHLBG1FNHkIcL0L4zHWEjJ5tKNERewUpJgtEhmf61IGfh8uXCnvo-Mx9kG7kVM/s1600-rw/05-qwen-Connect-a-Provider.png)

y luego:

`Standarrd API Key`

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrW25KUbrQHVJnWmixcl2h68AYwF5rrceDw2IfZj_Mj9mciTzEaLxgnBxX27kym63RKTuLlfa3ysLe9H1MO103I6mPp85XC-r6IdAlsG5q-A2xK-bT3wmfzqlxQMhCvNDlLcD1od0oQY-2-xoBToxjfMvDFcBg9sRMHmXbwXOS6N5KQtcB54H-rBbfXRc/s1600-rw/06-select-Standard-API-Key.png)


y luego, en mi caso yo seleccioné:

`Singapore`

pero eso es lo que me funcionó a mi, no se si funcionará en alguna de las otras opciones para el país donde vivo, Ecudor, bueno allí es de probar:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNbjscRwSjxtqLFML_Drqv5IK-vFBrN2FsyIfM6rj3ueIYMOLdwjmczJuJOiB6UAyw3HQBGj5hnm8L7pL1OoRfbbyPqnQaehiQpEw_U_tFhPd-y63DN_mtVJp0yx1NX7BLw29iTFJB1NbaspaQjD-7EVJYkHatAQ-BtZdaikHNH7ByM3zGO2mwn7Ch1rw/s1600-rw/07-select-Singapore.png)

luego poner la API Key:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1pXgVyZSaoU-SqO13bqTL5gTHx8aoBiagKOqH5LV7ic9g21u8iOWPKwpgkIM8l_RnENi28sYW4Pfd5QrkrPqDAHeOvAUw9Y4tNM5_vm_PiXb8_OPb_Qh6MKNktA0FJdQo24JhLoHkrouv5QhGSWRvb_HSUE41gPppqmvhte_U6m_A4CJcrKFzYgXNWmc/s1600-rw/08-poner-la-API-Key.png)

y seleccionar un modelo, para programa yo seleccioné un modelo plus:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdgL6s10hVOanfOFicNbtINYqaxUcvkH89jYSPqhKiqkddbpbT1GjwiB_1K0IH3eTnx6NT3ZBl4tk5sfnBDH11BlOPEErsS0VxzG0MuHtHMiPfSOzyZNuZXW6R7Eq0CPUor2vK_4AXoTc7OdYLk_VOnoTBlGdw6r3WZ81zb7KXS3sAWwdHTX5bLhlwRi4/s1600-rw/09-para-programar-seleccione-una-de-las-qwen-plus.png)

y luego de eso ya podrás empezar a escribir o colocar los promts que desees ejecutar allí:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcj8A24oB_z-SQWWiTnX-BdwPvhlusvkhguVHqrXX2Wl3X6ftpvsrFRlGL1i6NJSg9RcLr_oMpcpVsE352cFRA3-ebT8FFlWcWnTx7ivRaNcrmUvDRXe4Gi6OxWLuG7yGUyrgZ7eGSWy8u6DgV_nx1E1jzYx6EzER2sHCmOhBt_Ee8WUgVU4EcsvHk87w/s1600-rw/10-escribe-tu-mensaje-en-qwen.png)

Dios les bendiga