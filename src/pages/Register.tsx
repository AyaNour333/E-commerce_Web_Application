import { Heading } from '@components/common';
import {Form , Button, Row, Col, Spinner} from 'react-bootstrap';
import { Input } from "@components/forms";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";

function Register(){
    const {loading , 
        error , 
        accessToken , 
        emailAvailabilityStatus ,
        formErrors,
        register , 
        handleSubmit , 
        submitForm ,
        emailOnBlurHandler
    } = useRegister()
    if(accessToken){
        return <Navigate to="/"/>
    }
    return(
        <>
        <Heading title='User Registration'/>
        <Row>
            <Col md={{span: 6 , offset: 3}}>
                <Form onSubmit={handleSubmit(submitForm)}>
                    <Input label="First Name" name="firstName" register={register}
                    error={formErrors.firstName?.message}/>
                    <Input label="Last Name" name="lastName" register={register}
                    error={formErrors.lastName?.message}/>
                    <Input label="Email address" name="email" register={register}
                    onBlur={emailOnBlurHandler} 
                    error={formErrors.email?.message ? formErrors.email?.message 
                        : emailAvailabilityStatus==="notAvailable"
                        ? "This email is already in use." 
                        :emailAvailabilityStatus=== "failed"?
                        "Error from the server"
                        :""
                    }
                    formText={
                        emailAvailabilityStatus=== "checking"?
                        "We're currently checking the availability of this email address. Please wait a moment."
                        :""
                    }
                    success={
                        emailAvailabilityStatus=== "available"
                        ?"This email is available for use."
                        : ""
                    }
                    disabled={emailAvailabilityStatus=== "checking"?true:false}
                    />
                    <Input label="Password" name="password" register={register}
                    type='password' error={formErrors.password?.message}/>
                    <Input label="Confirm Password" name="confirmPassword" register={register}
                    type='password' error={formErrors.confirmPassword?.message}/>
                    <Button variant="info" type="submit" style={{color:"white"}}
                    disabled={
                        emailAvailabilityStatus=== "checking"
                        ? true 
                        : false || loading==="pending"}
                        >
                        {loading==="pending"
                        ?<>
                        <Spinner animation="border" size="sm"></Spinner> Loading...
                        </>
                        :"Submit"}
                    </Button>
                    {error &&<p style={{color:"#dc3545" , marginTop:"10px"}}>{error}</p>}
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default Register