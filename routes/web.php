<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;   
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/get_user', [UserController::class, 'getUser'])->name('get_user');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/class', [ClassController::class, 'index'])->name('class');
    Route::post('/class/student/join', [ClassController::class, 'joinClass'])->name('class.student.join');
    Route::post('/class/student/check_membership', [ClassController::class, 'checkMembership'])->name('class.student.check_membership');
    
    Route::middleware('faculty')->group(function (){
        Route::get('/class/{class_id}', [ClassController::class, 'edit'])->name('class.edit');
        Route::get('/class/{class_id}/open', [ClassController::class, 'open'])->name('class.open');
        Route::get('/class/{class_id}/open/activity/{activity_id}', [ClassController::class, 'editActivity'])->name('class.activity.edit');
        Route::get('/class/{class_id}/open/activity/{activity_id}/scan', [ClassController::class, 'scanPage'])->name('class.activity.scan');
        
        Route::get('/class/{class_id}/open/students', [ClassController::class, 'studentsPage'])->name('class.students.page');

        Route::post('/class/open/activity/scan/find_student', [ClassController::class, 'findStudent'])->name('class.activity.scan.find_student');
        Route::post('/class/open/activity/scan/save_score', [ClassController::class, 'saveScore'])->name('class.activity.scan.save_score');
        Route::post('/class/activity/update', [ClassController::class, 'updateActivity'])->name('class.activity.update');
        Route::patch('/class/update', [ClassController::class, 'update'])->name('class.update');
        Route::get('/class/{class_id}/gradingsystem', [ClassController::class, 'gradingSystem'])->name('class.gradingsystem');
        Route::patch('/class/{class_id}/gradingsystem/patch', [ClassController::class, 'gradingSystemPatch'])->name('class.gradingsystem.patch');
        Route::post('/subject/gradingsystem/usesubjectgradingsystem', [ClassController::class, 'useSubjectGradingSystem'])->name('class.useSubjectGradingSystem');
        
        Route::get('/class/{class_id}/open/gradesheet', [ClassController::class, 'gradesheetPage'])->name('class.gradesheet');

        Route::get('/subject', [SubjectController::class, 'index'])->name('subject');
        Route::get('/subject/{subject_id}', [SubjectController::class, 'edit'])->name('subject.edit');
        Route::patch('/subject/update', [SubjectController::class, 'update'])->name('subject.update');
        Route::post('/subject/delete', [SubjectController::class, 'delete'])->name('subject.delete');
        Route::get('/subject/{subject_id}/gradingsystem', [SubjectController::class, 'gradingSystem'])->name('subject.gradingsystem');
        Route::patch('/subject/{subject_id}/gradingsystem/patch', [SubjectController::class, 'gradingSystemPatch'])->name('subject.gradingsystem.patch');
    });
});

require __DIR__.'/auth.php';
