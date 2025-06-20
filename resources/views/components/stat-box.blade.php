@props(['count', 'label', 'icon', 'color'])

<div class="p-4 rounded shadow {{ $color }}">
    <div class="text-2xl font-bold">{{ $count }}</div>
    <div class="text-sm text-gray-700">{{ $label }}</div>
</div>
