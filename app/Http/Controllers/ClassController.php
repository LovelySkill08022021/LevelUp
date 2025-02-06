<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AppClass;
use App\Models\Subject;
use App\Models\ClassGradingSystem;
use App\Models\GradingSystem;
use App\Models\ClassMember;
use App\Models\Activity;
use App\Models\Score;
use App\Models\CreditScore;
use App\Models\CreditScoreHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Exception;

class ClassController extends Controller
{
    public function getClass(){
        $classes = AppClass::leftJoin('subjects', 'app_classes.subject_id', 'subjects.id')
        ->leftJoin('users', 'users.id', 'app_classes.faculty_id')
        ->where(function($query){
            if(Auth()->user()->user_type == "student"){
                $query->where('app_classes.course', Auth()->user()->course);
            } else if(Auth()->user()->user_type == "faculty"){
                $query->where('app_classes.faculty_id', Auth()->user()->id);
            }
        })
        ->select(
            'app_classes.*',
            'subjects.id as subject_id',
            'subjects.code as subject_code',
            'subjects.title as subject_title',
            'subjects.units_lec as subject_units_lec',
            'subjects.units_lab as subject_units_lab',
            'users.id as user_id',
            'users.student_number as user_student_number',
            'users.last_name as user_last_name',
            'users.first_name as user_first_name',
            'users.middle_name as user_middle_name',
            'users.course as user_course',
            'users.verified as user_verified',
            'users.user_type as user_user_type',
            'users.email as user_email'
        )
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'semester' => $item->semester,
                'school_year' => $item->school_year,
                'course' => $item->course,
                'year_level' => $item->year_level,
                'section' => $item->section,
                'subject' => [
                    'id' => $item->subject_id,
                    'code' => $item->subject_code,
                    'title' => $item->subject_title,
                    'units_lec' => $item->subject_units_lec,
                    'units_lab' => $item->subject_units_lab
                ],
                'faculty' => [
                    'id' => $item->user_id,
                    'student_number' => $item->user_student_number,
                    'last_name' => $item->user_last_name,
                    'first_name' => $item->user_first_name,
                    'middle_name' => $item->user_middle_name,
                    'course' => $item->user_course,
                    'verified' => $item->user_verified,
                    'user_type' => $item->user_user_type,
                    'email' => $item->user_email
                ]
            ];
        });
        return $classes;
    }
    
    public function index(){
        $classes = $this->getClass();
        
        // dd($classes);
        return Inertia::render("Class/Page", [
            "classes" => $classes
        ]);
    }

    public function edit(int $class_id){
        $class = $this->getClass()->where('id', $class_id)->first();
        // dd($class);
        // $class = AppClass::leftJoin('subjects', 'app_classes.subject_id', 'subjects.id')
        // ->where('app_classes.id', $class_id)
        // ->select(
        //     'app_classes.*',
        //     'subjects.id as subject_id',
        //     'subjects.code as subject_code',
        //     'subjects.title as subject_title',
        // )
        // ->get()
        // ->map(function ($item) {
        //     return [
        //         'id' => $item->id,
        //         'name' => $item->name,
        //         'semester' => $item->semester,
        //         'school_year' => $item->school_year,
        //         'course' => $item->course,
        //         'subject' => [
        //             'id' => $item->subject_id,
        //             'code' => $item->subject_code,
        //             'title' => $item->subject_title,
        //         ],
        //     ];
        // });
        
        $subjects = Subject::all();
        // $class = sizeof($class) != 0 ? $class[0] : null;
        return Inertia::render("Class/Edit", [
            "class_id" => $class_id,
            "_class" => $class,
            "subjects" => $subjects
        ]);
    }
    
    public function update(Request $request){
        $class_name_validation = ($request->id == 0 ? 'required|string|max:255|unique:'.AppClass::class : 'required|string|max:255');
        $request->validate([
            'name' => $class_name_validation,
            'semester' => 'required',
            'school_year' => 'required|regex:/^\d{4}-\d{4}$/|max:9',
            'course' => 'required|max:10',
            'year_level' => 'required',
            'section' => 'required|max:1',
            'subject' => 'required',
        ],[
            'school_year.regex' => 'The :attribute must be in the format "xxxx-yyyy"',
            'school_year.required' => 'The :attribute field is required.',
        ]);
        
        if($request->id == 0){
            $class = new AppClass;
            $class->name = $request->name;
            $class->semester = $request->semester;
            $class->school_year = $request->school_year;
            $class->course = $request->course;
            $class->year_level = $request->year_level;
            $class->section = $request->section;
            $class->subject_id = $request->subject;
            $class->faculty_id = Auth()->user()->id;
            $result = $class->save();

            $message = $result ? "Created subject" : "Failed to save subject";
            
            return redirect("/class/$request->id");
        }

        $class = AppClass::find($request->id);
        $class->name = $request->name;
        $class->semester = $request->semester;
        $class->school_year = $request->school_year;
        $class->course = $request->course;
        $class->year_level = $request->year_level;
        $class->section = $request->section;
        $class->subject_id = $request->subject;
        $class->faculty_id = Auth()->user()->id;
        $result = $class->save();

        return redirect("/class");

    }

    public function gradingSystem(int $class_id){
        $class = AppClass::leftJoin('subjects', 'subjects.id', 'app_classes.subject_id')
        ->select(
            'app_classes.*',
            'subjects.id as subject_id',
            'subjects.code as subject_code',
            'subjects.title as subject_title',
        )
        ->where('app_classes.id', $class_id)
        ->get()
        ->map(function($item){
            return [
                'id' => $item->id,
                'name' => $item->name,
                'semester' => $item->semester,
                'school_year' => $item->school_year,
                'course' => $item->course,
                'subject' => [
                    'id' => $item->subject_id,
                    'code' => $item->subject_code,
                    'title' => $item->subject_title,
                ],
            ];
        });

        // dd($class[0]);
        $class_grading_systems = ClassGradingSystem::where('class_id', $class_id)->get();
        return Inertia::render("Class/GradingSystem/Page", [
            "_class" => $class[0],
            "current_class_grading_systems" => $class_grading_systems,
        ]);
    }

    public function useSubjectGradingSystem(Request $request){
        $class_id = $request->class_id;
        $grading_systems = GradingSystem::where("subject_id", $request->subject_id)
        ->select(
            'grading_systems.id as id',
            'grading_systems.component as component',
            'grading_systems.weight as weight'
        )
        ->get()
        ->map(function($item) use ($class_id){
            return [
                'id' => $item->id,
                'class_id' => $class_id,
                'component' => $item->component,
                'weight' => $item->weight,
            ];
        });
        // dd($grading_systems);
        return $grading_systems;
    }

    function gradingSystemPatch(Request $request, int $class_id){
        DB::transaction(function() use ($request, $class_id){

            $status = ClassGradingSystem::where("class_id", $class_id)->delete();

            foreach($request->grading_systems as $grading_system){
                $new_grading_system = new ClassGradingSystem;
                $new_grading_system->class_id = $class_id;
                $new_grading_system->component = $grading_system['component'];
                $new_grading_system->weight = $grading_system['weight'];
                $result = $new_grading_system->save();
                
                // return $result;
            }
            
            // dd($request->grading_systems, $class_id);
        });

        return redirect("/class/$class_id/gradingsystem");

    }

    public function open(int $class_id){
        $class = AppClass::find($class_id);
        $activities = Activity::leftJoin('app_classes', 'activities.class_id', 'app_classes.id')
        ->where('activities.class_id', $class_id)
        ->select(
            'activities.*',
            'app_classes.id as class_id',
            'app_classes.name as class_name',
            'app_classes.semester as class_semester',
            'app_classes.school_year as class_school_year',
            'app_classes.course as class_course',
        )
        ->get()
        ->map(function($item){
            return [
                'id' => $item->id,
                'name' => $item->name,
                'max_score' => $item->max_score,
                'type' => $item->type,
                'date' => date("M d, Y", strtotime($item->created_at)),
                'time' => date("h:i A", strtotime($item->created_at)),
                'class' => [
                    'id' => $item->class_id,
                    'name' => $item->class_name,
                    'semester' => $item->class_semester,
                    'school_year' => $item->class_school_year,
                    'course' => $item->class_course
                ],
            ];
        });

        return Inertia::render("Class/Open/Activity/Page", [
            '_class' => $class,
            "activities" => $activities
        ]);
    }

    public function editActivity(int $class_id, int $activity_id){
        $class = AppClass::find($class_id);

        $activity = Activity::find($activity_id);
        $grading_systems = ClassGradingSystem::where('class_id', $class_id)->select('component')->get();

        $grading_systems_collection = collect();
        foreach ($grading_systems as $component) {
            $grading_systems_collection->push($component->component);
        }
        
        // dd($grading_systems_collection);
        return Inertia::render("Class/Open/Activity/Edit", [
            '_class' => $class,
            'activity_id' => $activity_id,
            "activity" => $activity,
            "grading_systems" => $grading_systems_collection
        ]); 
    }

    public function updateActivity(Request $request){
        $request->validate([
            'class' => 'required',
            'name' => 'required|max:50',
            'max_score' => 'required|integer',
            'type' => 'required|max:5',
        ]);

        $success = null;
        
        
        if($request->id == 0){
            $Activity = new Activity;
            $Activity->class_id = $request->class;
            $Activity->name = $request->name;
            $Activity->max_score = $request->max_score;
            $Activity->type = $request->type;
            $success = $Activity->save();

        } else {
            
            $Activity = Activity::find($request->id);
            $Activity->class_id = $request->class;
            $Activity->name = $request->name;
            $Activity->max_score = $request->max_score;
            $Activity->type = $request->type;
            $success = $Activity->save();
        }

        if($success){
            return back();
            // return redirect("/class/$request->class/open/activities");
        }

        // return redirect("/class/$request->class/open/activity/$request->id");
        return back()->withErrors([
            "message" => "Error"
        ]);
    }

    public function scanPage(int $class_id,int $activity_id){
        $class = AppClass::find($class_id);
        
        $students = User::leftJoin('class_members', 'users.id', 'class_members.student_id')
        ->where([['users.user_type', 'student'],['class_members.class_id', $class_id],['class_members.accepted', 1]])
        ->get();

        // dd($students);

        $activity = Activity::find($activity_id);
        return Inertia::render('Class/Open/Activity/Scan/Page', [
            '_class' => $class,
            'students' => $students,
            'activity' => $activity,
        ]);
    }

    public function findStudent(Request $request){
        $student = User::where('student_number', $request->std_no)->get();
        
        if(sizeof($student) <= 0){
            return 'no_student';
        }

        $student_has_score = Score::where([['activity_id', $request->activity_id],['student_id', $student[0]->id]])->exists();
        
        if($student_has_score){
            return "student_has_score";
        }

        return $student[0];
    }

    public function saveScore(Request $request){
        $student = User::where('student_number', $request->student_number)->get();
        
        if(sizeof($student) <= 0){
            return "No student found. It is possible that the student with a ($request->student_number) student number is not yet registered.";
        }

        if($student[0]->user_type != 'student'){
            return "This user is not a student. Please check the entered student number.";
        }

        $student_has_score = Score::where([['activity_id', $request->activity_id],['student_id', $student[0]->id]])->exists();
        
        if($student_has_score){
            return "The student already have a score in the activity.";
        }
        
        $score = new Score;
        $score->activity_id = $request->activity_id;
        $score->student_id = $student[0]->id;
        $score->score = $request->score;
        $res = $score->save();

        if(!$res){
            return "Failed to save score, please try again.";
        }

        return "success";
    }

    public function studentsPage(int $class_id){
        $class = $this->getClass()->where('id', $class_id)->first();
        // dd($class);
        $pending_students = ClassMember::leftJoin('users', 'class_members.student_id', 'users.id')
        ->where([['class_members.class_id', $class_id],['accepted', 0]])
        ->select(
            'users.*',
            'class_members.id as cm_id',
            'class_members.created_at as cm_created_at'
        )
        ->get()
        ->map(function($item){
            return [
                'cm_id' => $item->cm_id,
                'id' => $item->id,
                'student_number' => $item->student_number,
                'last_name' => $item->last_name,
                'first_name' => $item->first_name,
                'middle_name' => $item->middle_name,
                'course' => $item->course,
                'date' => date("M d, Y", strtotime($item->cm_created_at)),
                'time' => date("h:m A", strtotime($item->cm_created_at))
            ];
        });

        $students = ClassMember::leftJoin('users', 'class_members.student_id', 'users.id')
        ->orderBy('users.last_name', 'asc')
        ->where([['class_members.class_id', $class_id],['accepted', 1]])
        ->select(
            'users.*'
        )
        ->get();

        return Inertia::render("Class/Open/Student/Page", [
            '_class' => $class,
            'pending_students' => $pending_students,
            'students' => $students
        ]);
    }

    public function studentClassProfile(int $class_id, int $student_id){
        $class = $this->getClass()->where('id', $class_id)->first();
        $student = User::find($student_id);
        $credit_score = CreditScore::where('student_id', $student_id)->first();
        
        $credit_score_info = null;
        if($credit_score != null){
            $credit_score_history = CreditScoreHistory::where('credit_score_id', $credit_score->id)
            ->get()
            ->map(function($item){
                return [
                    "id" => $item->id,
                    "points" => $item->points,
                    "mode" => $item->mode,
                    "date" => date('M d, Y h:i A', strtotime($item->created_at)),
                    "date_removed" => date('M d, Y h:i A', strtotime($item->updated_at)),
                ];
            });

            $credit_score_info = [
                "id" => $credit_score->id,
                "student_id" => $credit_score->student_id,
                "points" => $credit_score->points,
                'history' => $credit_score_history
            ];
        }

        // dd($credit_score_info);

        return Inertia::render('Class/Open/Student/ClassProfile/Page', [
            '_class' => $class,
            'student' => $student,
            'credit_score_info' => $credit_score_info
        ]);
    }

    public function addCreditScore(Request $request){
        // dd($request->all());
        $status = DB::transaction(function() use ($request){
            $credit_score = CreditScore::where('student_id', $request->student_id)->first();
            $credit_score_status = "";
            
            if($credit_score == null){
                $credit_score = new CreditScore;
                $credit_score->student_id = $request->student_id;
                $credit_score->points = $request->points;
                $credit_score_status = $credit_score->save();
            } else {
                $credit_score_status = $credit_score->increment('points', $request->points);
            }

            $history_status = "";
            if($credit_score_status){ 
                $history = new CreditScoreHistory;
                $history->credit_score_id = $credit_score->id;
                $history->points = $request->points;
                $history->mode = 'add';
                $history_status = $history->save();
            }

            if($history_status && $credit_score_status){
                return true;
            }

            return false;
        });

        if($status){
            return back();
        }

        return back()->withErrors([
            "message" => "Failed to add points, please try again."
        ]);
    }

    public function removeCreditScore(Request $request){
        
        $status = DB::transaction(function() use ($request){
            $history = CreditScoreHistory::find($request->history_id);
            $history->mode = 'deduct';
            $history_result = $history->save();
    
            $credit_score = CreditScore::where('id', $history->credit_score_id)->first();
            $credit_score_result = $credit_score->decrement('points', $history->points);
            
            if($history_result && $credit_score_result){
                return true;
            }

            return false;
        });

        if($status){
            return back();
        }

        return back()->withErrors([
            "message" => "Failed to remove points, please try again."
        ]);
    }

    public function addStudentsPage(int $class_id){
        $class = $this->getClass()->where('id', $class_id)->first();
        return Inertia::render("Class/Open/Student/AddStudentPage", [
            '_class' => $class,
        ]);
    }

    public function addStudents(Request $request){
        $student_numbers_for_save = $request->student_numbers_for_save;
        $class_id = $request->class_id;
        $students_accepted = [];
        $already_added = [];
        $failed_to_save = [];
        $not_found_students = [];
        $newly_added = [];

        foreach ($student_numbers_for_save as $student_number) {

            $user = User::where('student_number', $student_number)->first();
            
            if($user){
                $class_member_check = ClassMember::where([['student_id', $user->id],['class_id', $class_id]])->first();
                
                if($class_member_check){
                    if($class_member_check->accepted == 1){
                        array_push($already_added, "$user->student_number - $user->last_name, $user->first_name");
                        continue;
                    } else if ($class_member_check->accepted == 0 || $class_member_check->accepted == 3) {
                        $class_member_check->accepted = 1;
                        $result = $class_member_check->save();
                        
                        if(!$result){
                            array_push($failed_to_save, "$student_number - $user->last_name, $user->first_name");
                            continue;
                        }
                        
                        array_push($students_accepted, "$student_number - $user->last_name, $user->first_name");
                        continue;
                    }
                }

                $new_class_member = new ClassMember;
                $new_class_member->student_id = $user->id;
                $new_class_member->class_id = $class_id;
                $new_class_member->accepted = 1;
                $result = $new_class_member->save();

                if(!$result){
                   array_push($failed_to_save, "$student_number - $user->last_name, $user->first_name");
                   continue;
                }
                
                array_push($newly_added, "$student_number - $user->last_name, $user->first_name");
                
                
            } else {
                array_push($not_found_students, $student_number);
            }
        }

        return [
            "newly_added" => $newly_added,
            "students_accepted" => $students_accepted,
            "failed_to_save" => $failed_to_save,
            "not_found_students" => $not_found_students,
            "already_added" => $already_added
        ];

    }

    public function getJoinPendingStudents(Request $request){
        $pending_students = ClassMember::leftJoin('users', 'class_members.student_id', 'users.id')
        ->where([['class_members.class_id', $request->class_id],['accepted', 0]])
        ->select(
            'users.*',
            'class_members.id as cm_id',
            'class_members.created_at as cm_created_at'
        )
        ->get()
        ->map(function($item){
            return [
                'cm_id' => $item->cm_id,
                'id' => $item->id,
                'student_number' => $item->student_number,
                'last_name' => $item->last_name,
                'first_name' => $item->first_name,
                'middle_name' => $item->middle_name,
                'course' => $item->course,
                'date' => date("M d, Y", strtotime($item->cm_created_at)),
                'time' => date("h:m A", strtotime($item->cm_created_at))
            ];
        });

        return $pending_students;
    }

    public function joinClass(Request $request){

        $class_member = new ClassMember;
        $class_member->student_id = $request->student_id;
        $class_member->class_id = $request->class_id;
        $class_member->accepted = 0;
        $result = $class_member->save();

        // $result = true;

        if(!$result){
            return back()->withErrors([
                "status" => "error",
                "message" => "Failed to join the class, please try again."
            ]);
        }
        
        return redirect('/class');
    }

    public function joinClassRespond(Request $request){
        if($request->type == "a"){
            $member = ClassMember::find($request->student['cm_id']);
            $member->accepted = 1;
            $result = $member->save();

            if($result){
                return [
                    "status" => 'success',
                    "message" => "Student accepted."
                ];
            }
        } else if($request->type == "r"){
            $member = ClassMember::find($request->student['cm_id']);
            $member->accepted = 3;
            $result = $member->save();

            if($result){
                return [
                    "status" => 'success',
                    "message" => "Student rejected."
                ];
            }
        }

        return [
            "status" => 'error',
            "message" => "Something went wrong. Please try again."
        ];
    }

    public function checkMembership(Request $request){
        $joined = ClassMember::where([['student_id', Auth()->user()->id],['class_id', $request->class_id]])->exists();

        if($joined){
            return true;
        }

        return false;
    }

    public function gradesheetPage(int $class_id){
        // $class = AppClass::find($class_id);
        $class = $this->getClass()->where('id', $class_id)->first();
        // dd($class);
        $students = ClassMember::leftJoin('users', 'class_members.student_id', 'users.id')
        ->where([['class_members.class_id', $class_id],['accepted', 1]])
        ->orderBy('users.last_name', 'asc')
        ->select(
            'users.id',
            'users.student_number',
            'users.last_name',
            'users.first_name',
            'users.middle_name'
        )
        ->get();

        $class_grading_systems = ClassGradingSystem::where('class_id', $class_id)->get();
        
        
        $activities = Activity::where('class_id', $class_id)->get();
        $activities_collection = collect();
        foreach($activities as $activity){
            $activities_collection->push([
                'id' => $activity->id,
                'class_id' => $activity->class_id,
                'name' => $activity->name,
                'max_score' => $activity->max_score,
                'type' => $activity->type
            ]);
        }
        $activities_collection = $activities_collection->sortBy('id');
        
        
        $scores = Score::all();
        $scores_collection = collect();
        foreach($scores as $score){
            $scores_collection->push([
                'id' => $score->id,
                'activity_id' => $score->activity_id,
                'student_id' => $score->student_id,
                'score' => $score->score
            ]);
        }
        $scores_collection = $scores_collection->sortBy('id');
        

        $student_collection = collect();
        foreach ($students as $student) {
            $row_collection = collect([
                'id' => $student->id,
                'student_number' => $student->student_number,
                'last_name' => $student->last_name,
                'first_name' => $student->first_name,
                'middle_name' => $student->middle_name
            ]);
            
            $total_score = 0;
            $remarks = null;
            foreach ($class_grading_systems as $cgs) {
                $unique_type_activities_count = $activities_collection->where('type', $cgs->component)->count();
                if($unique_type_activities_count > 0){

                    $unique_type_act_ave = 0;
                    $number_of_unique_act = 0;

                    $unique_type_activities = $activities_collection->where('type', $cgs->component);
                    $post_fix_n = 1;
                    foreach($unique_type_activities as $unique_type_activity){
                        // dd($unique_type_activity);
                        $act_score = $scores_collection->where('activity_id', $unique_type_activity['id'])->where('student_id', $student->id)->values()->all();
                        $score = "";
                        if(sizeof($act_score) > 0){
                            $score = $act_score[0]['score'];
                        } else {
                            $remarks = "INCOMPLETE";
                        }

                        $row_collection->put("$cgs->component$post_fix_n", $score);
                        $row_collection->put("max$cgs->component$post_fix_n", $unique_type_activity['max_score']);

                        // sum of pre-percentage average
                        $unique_type_act_ave += round(((int)$score / $unique_type_activity['max_score']) * 100, 2);
                        $number_of_unique_act++;

                        $post_fix_n++;
                    }

                    // calculation of average
                    $final_act_score_average = round($unique_type_act_ave / $number_of_unique_act, 2);
                    $row_collection->put("$cgs->component AVE", $final_act_score_average);
                    
                    //start of percentage calculation
                    $average_percent = $final_act_score_average * ($cgs->weight/100);
                    $row_collection->put("$cgs->component $cgs->weight%", $average_percent);
                    
                    // calculation of total score
                    $total_score += $average_percent;
                }
                
            }


            $row_collection->put("Total", $total_score);
            
            $grade = 0;
            if($total_score >= 97){
                $grade = 1.00;
            } else if($total_score >= 92){
                $grade = 1.25;
            } else if($total_score >= 86){
                $grade = 1.50;
            } else if($total_score >= 80){
                $grade = 1.75;
            } else if($total_score >= 74){
                $grade = 2.00;
            } else if($total_score >= 68){
                $grade = 2.25;
            } else if($total_score >= 62){
                $grade = 2.50;
            } else if($total_score >= 56){
                $grade = 2.75;
            } else if($total_score >= 50){
                $grade = 3.00;
            } else if($total_score >= 40){
                $grade = 4.00;
            } else {
                $grade = 5.00;
            }
            
            if($remarks == "INCOMPLETE"){
                $grade = "INC(".round($grade,2).")";
            }

            $row_collection->put("Grade", $grade);
            
            //calculation of remarks
            if(!$remarks){
                if($grade<=3.00){
                    $remarks = "PASSED";
                } else if($grade == 4.00){
                    $remarks = "CONDITIONAL";
                } else if($grade == 5.00){
                    $remarks = "FAILED";
                }
            }


            $row_collection->put("Remarks", $remarks);
            
            $student_collection->push($row_collection);
        }

        
        // dd($activities_collection, $scores_collection);
        // dd($student_collection);

        return Inertia::render("Class/Open/GradeSheet/Page", [
            '_class' => $class,
            'student_collection' => $student_collection
        ]);
    }
}
