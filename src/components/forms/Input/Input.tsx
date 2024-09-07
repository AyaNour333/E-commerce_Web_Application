import {Form} from 'react-bootstrap';
import { Path , FieldValues, UseFormRegister} from 'react-hook-form';


type InputProps<TFieldValue extends FieldValues> = {
    label: string
    name: Path<TFieldValue>
    type?: string
    register: UseFormRegister<TFieldValue>
    error?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>)=>void
    formText?: string
    success?: string
    disabled?: boolean
}

// <TFieldValue> generic i do not know type of name
function Input<TFieldValue extends FieldValues>(
    {label, 
    type="text", 
    error, 
    register, 
    name, 
    onBlur,
    formText,
    success,
    disabled
    }: InputProps<TFieldValue>){
    const onblurHandler = (e: React.FocusEvent<HTMLInputElement>)=>{
        if(onBlur){
            onBlur(e)
            register(name).onBlur(e)
        }else{
            register(name).onBlur(e)
        }
    }
    return(
        <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} {...register(name)} 
            style={{height:"35px"}}
            onBlur={onblurHandler}
            isInvalid={error? true : false}
            isValid={success? true : false}
            disabled={disabled}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
                {success}
            </Form.Control.Feedback>
            {formText && <Form.Text muted>{formText}</Form.Text>}
        </Form.Group>
    )
}

export default Input