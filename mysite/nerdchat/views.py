from django.shortcuts import render

def index(request):
    return render(request, 'nerdchat/index.html')
    
def kontakt(request):
    return render(request, 'nerdchat/kontakt.html')

def impressum(request):
    return render(request, 'nerdchat/impressum.html')

def f_a(request):
    return render(request, 'nerdchat/f_a.html')

def chat(request):
    return render(request, 'nerdchat/chat.html')