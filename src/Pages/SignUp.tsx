import React, {useEffect} from 'react';
import NavBar from "@app/Components/NavBar";

type Props = {

};
const SignUp = (props: Props) => {
    useEffect(() => {
        document.title = 'Reģistrācija - Piecinieks';
    });
    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <form className="flex flex-col items-center justify-center h-full">
                <input type="email" id="email" name="email" placeholder="E-pasts" className={"border border-indigo-500/100 mb-8"} />
                <input type="text" id="username" name="username" placeholder="Lietotājs" className={"border border-indigo-500/100 mb-8"} />
                <input type="password" id="password" name="password" placeholder="Parole" className={"border border-indigo-500/100 mb-8"} />

                <input type="submit" value="Reģistrēties" className="cursor-pointer"/>
            </form>
        </div>

    );
};

export default SignUp;