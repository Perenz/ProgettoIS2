from moviepy.editor import VideoFileClip
import sys

def speedup(name, factor):
    source_video = VideoFileClip(name)#carico il video
    sped_up_video = source_video.speedx(float(factor))#velocizzo il video
    sped_up_video.write_videofile(name)#salvo il video, #?il nome è da cambiare?

name = sys.argv[1]
factor = sys.argv[2]

speedup(name, factor)

