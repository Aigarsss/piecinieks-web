import React from 'react';
import { Question } from '@app/Hooks/useQuestion';

type QuestionTableProps = {
    questions?: Array<Question> | undefined | false;
    handleDelete: (id: string) => void;
};

const QuestionTable: React.FC<QuestionTableProps> = ({ questions, handleDelete }) => {
    return (
        <section className="flex flex-col antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
            <div className="h-full">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Visi jautājumi</h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Jautājums</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Atbilde</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Pieņemtās atbildes</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Skaidrojums</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Datums</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Dzēst</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {questions &&
                                        questions.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="p-2">
                                                        <div className="flex items-center">
                                                            <div className="font-medium text-gray-800">
                                                                {item.question}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className=" font-medium text-green-500">{item.answer}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">{item.acceptedAnswers}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left">
                                                            {item.explanation && item.explanation}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-left whitespace-nowrap">
                                                            {item.airedAt && item.airedAt}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-lg font-medium text-center">
                                                            <span
                                                                className="px-4 py-2 rounded-full text-white bg-red-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-red-700 transition duration-300 ease"
                                                                onClick={() => handleDelete(item.id)}
                                                            >
                                                                Dzēst
                                                                <button className="bg-transparent hover focus:outline-none">
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        focusable="false"
                                                                        data-prefix="fas"
                                                                        data-icon="times"
                                                                        className="w-3 ml-3"
                                                                        role="img"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 352 512"
                                                                    >
                                                                        <path
                                                                            fill="currentColor"
                                                                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestionTable;
