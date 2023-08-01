import QuizComponent from '@/components/PageComponent/Admin/Quiz/QuizComponent';
import * as React from 'react';

export interface QuizProps {
}

export default function Quiz(props: QuizProps) {
    return (
        <div>
            <QuizComponent />
        </div>
    );
}
