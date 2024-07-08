import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

                    <Heading label={"Sign up"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    <InputBox label={"First Name"} placeholder={"John"}></InputBox>
                    <InputBox label={"Last Name"} placeholder={"Doe"}></InputBox>
                    <InputBox label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
                    <InputBox label={"Password"} placeholder={"john@doe"}></InputBox>
                    
                    <div className="pt-4">
                        <Button label={"Sign up"}></Button>
                    </div>

                    <ButtonWarning label={"Already have an account?"} linkText={"Sign in"} to={"/signin"}></ButtonWarning>
                </div>
            </div>

        </div>
    )
}