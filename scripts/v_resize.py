from moviepy.editor import VideoFileClip
import os
import sys

def resize(name, pixel_x, pixel_y):
    #potremo fare controllo errori su fine ed inizio 
    source_video = VideoFileClip(name)#carico il video
    resized_video = source_video.resize((float(pixel_x), float(pixel_y)))#taglio il video
    if os.path.exists(name):
        os.remove(name)
    resized_video.write_videofile(name)#salvo il video, #?il nome è da cambiare?

name = sys.argv[1]
pixel_x = sys.argv[2]
pixel_y = sys.argv[3]


resize(name, pixel_x, pixel_y)

