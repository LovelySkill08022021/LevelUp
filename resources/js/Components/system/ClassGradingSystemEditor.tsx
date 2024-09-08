import { Class, ClassGradingSystem } from '@/types';
import { grading_system_component } from '@/lib/data'

import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

interface Props {
    _class: Class;
    initial_grading_systems: ClassGradingSystem[];
    getGradingSystem: (grading_systems: ClassGradingSystem[]) => void;
}

export default function GradingSystemPage({ _class, initial_grading_systems, getGradingSystem }: Props) {
    const [counter, setCounter] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [grading_systems, setGradingSystems] = useState<ClassGradingSystem[]>([]);

    function addComponent(){
        let new_grading_system: ClassGradingSystem = {
            id: counter,
            class: _class,
            component: "",
            weight: 0
        };

        setGradingSystems([
            ...grading_systems,
            new_grading_system
        ]);

        setCounter(counter + 1);
    }

    function handleComponentChange(to_update_grading_system: ClassGradingSystem, value: any){
        const updated_grading_systems = grading_systems.map((grading_system) => {
            if(grading_system.id == to_update_grading_system.id){
                return {
                    ...grading_system,
                    component: value
                };
            } else {
                return grading_system;
            }
        });

        setGradingSystems(updated_grading_systems);
    }

    function handleWeightChange(to_update_grading_system: ClassGradingSystem, value: any){
        const updated_grading_systems = grading_systems.map((grading_system) => {
            if(grading_system.id == to_update_grading_system.id){
                return {
                    ...grading_system,
                    weight: (value)
                };
            } else {
                return grading_system;
            }
        });

        setGradingSystems(updated_grading_systems);
        // computeTotal();
    }

    function removeComponent(grading_system: ClassGradingSystem){
        setGradingSystems(
            grading_systems.filter(currentGradingSystem => currentGradingSystem.id !== grading_system.id)
        );
    }

    function computeTotal(){
        setTotal(0);
        let tmp_total: number = 0;
        for(let grading_system of grading_systems){
            
            tmp_total += Number(grading_system.weight);
        }
        setTotal(tmp_total);
    }

    useEffect(() => {
        if(initial_grading_systems.length > 0){
            setGradingSystems(initial_grading_systems);
        } else {
            addComponent();
        }
    }, [initial_grading_systems]);

    useEffect(() => {
        computeTotal();
        getGradingSystem(grading_systems);
        
    }, [grading_systems]);


    return (
        <>
            <div className='mb-3'>
                {grading_systems.map((grading_system: ClassGradingSystem) => (
                    <div key={grading_system.id}>
                        <select value={grading_system.component} name="component" id="component" onChange={(e) => handleComponentChange(grading_system, e.target.value)} required>
                            <option defaultValue={""} hidden>-- select component --</option>
                            {grading_system_component.map((component: {value: string; label: string}, index: number) => (
                                <option key={index} value={component.value}>{component.label}</option>
                            ))}
                        </select>
                        <input type="text" placeholder='weight' value={grading_system.weight} onChange={(e)=>handleWeightChange(grading_system, e.target.value)} required />
                        <Button color='error' onClick={() => removeComponent(grading_system)}>remove</Button>
                    </div>
                ))}
            </div>
            <div className='mb-2'>
                <b>Total:</b> {total}%
            </div>
            <div>
                <Button variant='contained' color='primary' onClick={() => addComponent()}>Add</Button>
            </div>
        </>
    )
}
