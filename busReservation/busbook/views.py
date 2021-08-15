from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from .models import *
import json
from django.core import serializers
from django.http import HttpResponse
from .forms import TicketBookingForm


# Create your views here.
def landing(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        return JsonResponse({'yo' : 'yo'})

    return render(request, 'busbook/landing.html')


def home(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        fromPlace = data['fromPlace'], toPlace = data['toPlace']
        buses = Bus.objects.filter(fromPlace__icontains=fromPlace, toPlace__icontains=toPlace)
        buses_json = serializers.serialize('json', buses)
        return HttpResponse(buses_json, content_type='application/json')
    return render(request, 'busbook/home.html')


def faq(request):
    return render(request, 'busbook/faq.html')


def allBuses(request):
    locations = Location.objects.all()
    context = {
        'locations' : locations
    }
    return render(request, 'busbook/allbus.html', context)


def location_buses(request, pk):
    location = Location.objects.get(id=pk)
    buses = location.bus_set.all()
    context = {
        'location' : location,
        'buses' : buses
    }

    return render(request, 'busbook/location_buses.html', context)


def book(request, pk):
    bus = Bus.objects.get(id=pk)
    if request.method == 'POST':
        form = TicketBookingForm(request.POST)
        print(form.errors)
        if form.is_valid():
            obj = Ticket()
            obj.bus = bus
            obj.seatNumber = bus.currentSeat 
            obj.passengerFirstName = form.cleaned_data['passengerFirstName']
            obj.passengerLastName = form.cleaned_data['passengerLastName']
            obj.passengerGender = form.cleaned_data['passengerGender']
            obj.passengerAge = form.cleaned_data['passengerAge']
            obj.passengerPhone = form.cleaned_data['passengerPhone']
            obj.passengerEmail = form.cleaned_data['passengerEmail']
            obj.save()
            bus.currentSeat += 1
            bus.save()
            return redirect(f'/success/{obj.id}')
        else:
            print('Not Valid')
    form = TicketBookingForm()
    context = {
        'bus' : bus,
        'form' : form
    }
    return render(request, 'busbook/book.html', context)


def viewTicket(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        ticketID = data['ticketID']
        tickets = Ticket.objects.filter(id=ticketID)
        if not tickets:
            return JsonResponse({'notFound' : True})
        else:
            ticket = tickets.first()
            bus = ticket.bus
            ticket_json = serializers.serialize('json', [ticket, bus])
            return HttpResponse(ticket_json, content_type='application/json')
    return render(request, 'busbook/view_ticket.html')


def success(request, pk):
    context = {'pk' : pk}
    return render(request, 'busbook/success.html', context)