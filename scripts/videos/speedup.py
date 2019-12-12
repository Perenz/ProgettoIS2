from moviepy.editor import VideoFileClip
import os
import sys

def format(name):
   return name + '.mp4'

def speedup(output, source, factor):
    source_video = VideoFileClip(source)
    source_video.speedx(float(factor)).write_videofile(format(output))
    os.rename(format(output), output)

name = sys.argv[1]
factor = sys.argv[2]

out = 'new_' + name

speedup(out, name, factor)
