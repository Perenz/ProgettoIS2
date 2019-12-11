from moviepy.editor import VideoFileClip
import sys

def cut(name, start_time, end_time):
    #potremo fare controllo errori su fine ed inizio 
    cutted_video = VideoFileClip(name).subclip(float(start_time), float(end_time))#carico il video
    cutted_video.write_videofile(name)#salvo il video, #?il nome è da cambiare?

name = sys.argv[1]
start_time = sys.argv[2]
end_time = sys.argv[3]


cut(name, start_time, end_time)

