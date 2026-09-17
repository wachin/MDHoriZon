

for pkg in $(apt-rdepends \
cm-super-x11 "fonts-adf-*" \
fonts-alee fonts-ancient-scripts fonts-atarismall \
fonts-beteckna fonts-bpg-georgian fonts-breip fonts-dejavu-extra \
fonts-dkg-handwriting fonts-dustin fonts-ecolier-court \
fonts-ecolier-lignes-court fonts-essays1743 \
fonts-georgewilliams fonts-goudybookletter fonts-inconsolata \
fonts-isabella fonts-jsmath fonts-junicode fonts-jura fonts-larabie-deco \
fonts-larabie-straight fonts-larabie-uncommon \
fonts-linex fonts-linuxlibertine fonts-lyx fonts-manchufont \
fonts-noto-hinted fonts-noto-mono fonts-ocr-a fonts-oflb-euterpe \
fonts-okolaks fonts-opensymbol fonts-radisnoir fonts-sil-andika \
fonts-sil-charis fonts-sil-doulos fonts-sil-gentium \
fonts-sil-gentium-basic fonts-tiresias fonts-tomsontalks \
fonts-tuffy fonts-ubuntu-title gsfonts gsfonts-other \
lmodern t1-cyrillic t1-oldslavic t1-teams t1-xfree86-nonfree \
ttf-bitstream-vera ttf-engadget ttf-sjfonts \
ttf-staypuft ttf-summersby ttf-xfree86-nonfree \
ttf-xfree86-nonfree-syriac xfonts-scalable 2>/dev/null \
| grep -v '^ ' \
| sort -u); do
    apt download "$pkg"
done
