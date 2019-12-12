from moviepy.editor import VideoFileClip
import os
import sys

def format(name):
   return name + '.mp4'

def cut(output, source, start_time, end_time):
    source_video = VideoFileClip(source)
    source_video.subclip(float(start_time), float(end_time)).write_videofile(format(output))
    os.rename(format(output), output)

name = sys.argv[1]
start_time = sys.argv[2]
end_time = sys.argv[3]

out = 'new_' + name

cut(out, name, start_time, end_time)

