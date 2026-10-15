<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortLinkController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('login'));
Route::get('/s/{code}', [ShortLinkController::class, 'redirect'])->name('short-links.redirect');
Route::get('/invite/{token}', [InvitationController::class, 'accept'])->name('invitations.accept');
Route::post('/invite/{token}', [InvitationController::class, 'complete'])->name('invitations.complete');
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ShortLinkController::class, 'index'])->name('dashboard');
    Route::post('/short-links', [ShortLinkController::class, 'store'])->name('short-links.store');
    Route::post('/invitations', [InvitationController::class, 'store'])->name('invitations.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
