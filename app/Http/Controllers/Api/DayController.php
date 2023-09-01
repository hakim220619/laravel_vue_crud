<?php

namespace App\Http\Controllers\Api;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\DayResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDayRequest;

class DayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $categories = Day::when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_hari'), function ($query) {
                $query->where('hari', 'like', '%' . request('search_hari') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                ->orWhere('hari', 'like', '%' . request('search_global') . '%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);
        return DayResource::collection($categories);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDayRequest $request)
    {
        // dd($request->all());
        $this->authorize('day-create');
        $day = Day::create($request->validated());
        // dd($day);
        return new DayResource($day);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = DB::table('days')->where('id', $id)->first();
        // dd($id);
        return response()->json(
            [
                'status' => 200,
                'data' => $data
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, StoreDayRequest $request)
    {
        // dd($id);
        $this->authorize('day-edit');
        $data = [
            'hari' => $request->hari,
            'bulan' => $request->bulan,
            'tahun' => $request->tahun,
        ];
        DB::table('days')->where('id', $id)->update($data);
        return response()->json(
            [
                'status' => 200,
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = DB::table('days')->where('id', $id)->delete();
        // dd($id);
        return response()->json(
            [
                'status' => 200,
            ]
        );
    }
    public function getDay()
    {
        return DayResource::collection(Day::all());
    }
}
