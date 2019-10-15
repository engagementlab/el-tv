#!/bin/bash

ffmpeg -y -i slideshow.mp4 -vcodec libx264 -pix_fmt yuv420p -vf "drawbox=y=ih-h:color=black@0.4:width=iw:height=60:t=fill,drawtext=text=Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.:expansion=normal:fontfile=opensans.ttf: y=h-line_h-15:x=-(mod(5*n\,w+tw)-tw): fontcolor=white: fontsize=30" -an tst.mp4

