import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik"
import *as Yup from 'yup'
import { Link } from "react-router-dom"
import { useState } from "react"
import useMarvelAPI from './../../services/Api'
import ErrorMessage from '../secondaryComponents/errorMessage/Error'
import './characterSearch.scss'
import vision from "../../resources/img/vision.png"

const CharacterSearch = () => {

    const [foundChar, setFoundChar] = useState(null)
    const { getCharacterByName, loading, error } = useMarvelAPI()

    return (
        <div>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Введи имя персонажа, глупое авокадо!')
                        .min(3, 'Нужны хотя бы 3 буквы!')
                        .max(20, 'Ну куда ты разогнался...Непонятный Колбаскин')
                })}
                onSubmit={values => {
                    getCharacterByName(values.name)
                        .then(foundChar => setFoundChar(foundChar))
                }}
            >
                {() => {
                    return (

                        <Form className="form">
                            <h3>Found character by name</h3>
                            <Field name="name" type="text" autoComplete="off" />
                            <FormikErrorMessage name="name" component="div" className="error" />
                            <div className="randomchar__btns">
                                <button
                                    className="button button__main"
                                    style={{ opacity: loading && 0.5, margin: 10 }}
                                    type="submit"
                                    disabled={loading}>
                                    <div className="inner">Found</div>
                                </button>
                                {!foundChar
                                    ? null
                                    : !foundChar.id
                                        ? <div className="error">Character not found</div>
                                        : <Link to={`/characters/${foundChar.id}`}>
                                            <button className="button button__main"
                                                style={{ display: loading && 'none', margin: 10 }}>
                                                <div className="inner">Go to {foundChar.name} page!</div>
                                            </button>
                                        </Link>
                                }
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            {error && <ErrorMessage />}
            <img className="bg-decoration" src={vision} alt="vision" />
        </div>
    )
}

export default CharacterSearch