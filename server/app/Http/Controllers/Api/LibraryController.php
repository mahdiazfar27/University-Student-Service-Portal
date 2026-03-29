<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\IssuedBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LibraryController extends Controller
{
    public function index()
    {
        $books = Book::with('department')->get();
        return response()->json($books);
    }

    public function issueBook(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'student_id' => 'required|exists:students,id',
            'return_date' => 'required|date|after:today',
        ]);

        return DB::transaction(function () use ($request) {
            $book = Book::lockForUpdate()->find($request->book_id);

            if ($book->available_copies <= 0) {
                return response()->json(['message' => 'No copies available'], 422);
            }

            $book->decrement('available_copies');

            $issuedBook = IssuedBook::create([
                'book_id' => $request->book_id,
                'student_id' => $request->student_id,
                'issue_date' => now(),
                'expected_return_date' => $request->return_date,
                'status' => 'issued',
            ]);

            return response()->json([
                'message' => 'Book issued successfully',
                'data' => $issuedBook
            ]);
        });
    }
}
