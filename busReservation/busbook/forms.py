from django.forms import ModelForm
from .models import Ticket


class TicketBookingForm(ModelForm):

    class Meta:
        model = Ticket
        fields=[ 'passengerFirstName','passengerLastName', 'passengerGender', 'passengerAge','passengerPhone', 'passengerEmail']