@component('mail::message')
# New Contact Message

**Name:** {{ $name }}

**Email:** {{ $email }}

**Message:**

{{ $messageText }}

@endcomponent 