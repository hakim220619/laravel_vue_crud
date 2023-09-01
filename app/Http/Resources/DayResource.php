<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id'   => $this->id,
            'hari' => $this->hari,
            'bulan' => $this->bulan,
            'tahun' => $this->tahun,
            // 'created_at' => $this->created_at->toDateString()
        ];
    }
}
