<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;
use App\Models\GradingSystem;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SubjectController extends Controller
{
    public function index(){
        $subjects = Subject::all();
        return Inertia::render("Subject/Page", [
            "subjects" => $subjects
        ]);
    }

    public function edit(int $subject_id){

        $subject = Subject::find($subject_id);

        return Inertia::render("Subject/Edit", [
            "user" => Auth()->user(),
            "subject_id" => $subject_id,
            "subject" => $subject
        ]);
    }

    public function update(Request $request){
        $code_validation = ($request->id == 0 ? 'required|string|max:15|unique:'.Subject::class : 'required|string|max:15');
        $request->validate([
            'code' => $code_validation,
            'title' => 'required|string|max:255',
        ]);
        
        if($request->id == 0){
            $subject = new Subject;
            $subject->code = $request->code;
            $subject->title = $request->title;
            $result = $subject->save();
            $message = $result ? "Created subject" : "Failed to save subject";
            
            return redirect("/subject/$request->id");
        }

        $subject = Subject::find($request->id);
        $subject->code = $request->code;
        $subject->title = $request->title;
        $result = $subject->save();
        return redirect("/subject");

    }

    public function delete(Request $request){
        // dd($request->subject_id);
        $subject = Subject::find($request->subject_id);

        $result = $subject->delete();
        return redirect()->intended(route('subject', absolute: false));
    }

    public function gradingSystem(int $subject_id){
        $subject = Subject::find($subject_id);
        // dd($subject);
        $grading_systems = GradingSystem::where('subject_id', $subject_id)->get();
        
        return Inertia::render("Subject/GradingSystem/Page", [
            "subject" => $subject,
            "current_grading_systems" => $grading_systems,
        ]);
    }

    function gradingSystemPatch(Request $request, int $subject_id){
        DB::transaction(function() use ($request, $subject_id){

            $status = GradingSystem::where("subject_id", $subject_id)->delete();

            foreach($request->grading_systems as $grading_system){
                $new_grading_system = new GradingSystem;
                $new_grading_system->subject_id = $subject_id;
                $new_grading_system->component = $grading_system['component'];
                $new_grading_system->weight = $grading_system['weight'];
                $result = $new_grading_system->save();
                
                // return $result;
            }
            
            // dd($request->grading_systems, $subject_id);
        });

        return redirect("/subject/$subject_id/gradingsystem");

    }
}
