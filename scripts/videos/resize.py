from moviepy.editor import VideoFileClip
import os
import sys

def format(name):
   return name + '.mp4'

def resize(output, source, pixel_x, pixel_y):
    source_video = VideoFileClip(source)
    source_video.resize((float(pixel_x), float(pixel_y))) .write_videofile(format(output))
    os.rename(format(output), output)

name = sys.argv[1]
pixel_x = sys.argv[2]
pixel_y = sys.argv[3]

out = 'new_' + name

resize(out, name, pixel_x, pixel_y)

