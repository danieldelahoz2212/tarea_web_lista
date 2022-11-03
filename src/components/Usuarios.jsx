import { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';


const Usuarios = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [lista, setLista] = useState([])
    const [Editar, setEditar] = useState(false);
    const [id, setId] = useState('');

    const guardar = async (e) => {
        e.preventDefault()
        try {
            if (!nombre.trim() || /^\s+$/.test(nombre)) {
                alert('Ingrese Nombre')

                return
            }
            if (!apellido.trim() || /^\s+$/.test(apellido)) {
                alert('Ingrese Apellido')
                return
            }
            const data = await addDoc(collection(db, 'usuario'), {
                nombreUsuario: nombre,
                ApellidoUsuario: apellido,
            })
            setLista([
                ...lista,
                {
                    nombreUsuario: nombre,
                    ApellidoUsuario: apellido,
                    id: data.id
                }
            ])

            e.target.reset()

            setNombre('')
            setApellido('')
            setId('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const traerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'usuario'), (query) => {
                    setLista(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        traerDatos()
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'usuario', id))
        } catch (error) {
            console.log(error)
        }
    }

    const editarInf = item => {
        setNombre(item.nombreUsuario)
        setApellido(item.ApellidoUsuario)
        setId(item.id)
        setEditar(true)
    }

    const editarDoc = async e => {
        e.preventDefault()
        try {
            if (!nombre.trim() || /^\s+$/.test(nombre)) {
                alert('Ingrese Nombre')
                return
            }
            if (!apellido.trim() || /^\s+$/.test(apellido)) {
                alert('Ingrese Apellido')
                return
            }
            const editDoc = doc(db, 'usuario', id)
            await updateDoc(editDoc, {
                nombreUsuario: nombre,
                ApellidoUsuario: apellido
            })
            const newArray = lista.map(
                item => item.id === id ? {
                    id: id,
                    nombreUsuario: nombre,
                    ApellidoUsuario: apellido
                } : item
            )
            setLista(newArray)
            setNombre('')
            setApellido('')
            setEditar(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setEditar(false)
        setNombre('')
        setApellido('')
        setId('')
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Formulario</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className='text-center'>Lista de Usuarios</h4>
                    <ul className="list-group">
                        {
                            lista.map((item) => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'> {item.nombreUsuario} {item.ApellidoUsuario}</span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editarInf(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            Editar ? 'Editar Lista' : 'Agregar Usuario'
                        }
                    </h4>
                    <form onSubmit={
                        Editar ? editarDoc : guardar
                    }>
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Nombre'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingrese Apellido'
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)} />
                        {
                            Editar ? (
                                <>
                                    <button className='btn btn-warning btn-block'
                                        type='submit'>Editar</button>
                                    <button className='btn btn-dark btn-block'
                                        type='submit' onClick={() => cancelar()}>Cancelar</button>
                                </>
                            ) :
                                <button className='btn btn-primary btn-block'
                                    type='submit'>Agregar</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Usuarios
