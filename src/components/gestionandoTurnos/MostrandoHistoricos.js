import React,{useContext, useEffect} from 'react';
import {FormularioContext} from '../../context/contextFormulario';
//import FilterTable from 'react-filter-tables';
import {db} from '../../firebase'
import ExportExcel from 'react-export-excel'
import moment from 'moment';

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const MostrandoHistoricos = () => {

    const { setpaginadorGestor, setguardandoConsultaTurnos, guardandoConsultaTurnos } = useContext(FormularioContext);

    const volviendoGestion = () => {
        setpaginadorGestor(3)
    }
    
    const obteniendoTurnos= async() =>{
      db.collection("datosturno").orderBy('TurnoAsignado', 'asc').onSnapshot(
          (querySnapshot)=>{
              const docs = []
              querySnapshot.forEach(doc =>{                       
                  docs.push(
                      {...doc.data(), id:doc.id})
              })
              setguardandoConsultaTurnos(docs)
              /* console.log(docs) */
      })
      
      };

    const nombreReporteFecha =() =>{
        //let a = moment().format("h:mm:ss a, DD/M/YYYY");
        let a = moment().format("DD/M/YYYY, h:mm:ss a");
        const nombre = 'ReporteTurnos_'
        const finalnombre = nombre.concat(a)
        return finalnombre
    }

  

    useEffect(() => {
      obteniendoTurnos()  
    }, [])

    const FilterableTable = require('react-filterable-table');

      // Data for the table to display; can be anything
     

      const fields2 = [
        { name: 'TurnoAsignado', displayName: "Turno", inputFilterable: true, sortable: true },
        { name: 'numeroDocumento', displayName: "Identificación", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'nombreCiudadano', displayName: "Nombre", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'numeroCelular', displayName: "Celular", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'correoElectronico', displayName: "Correo", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'estadoSolicitud', displayName: "Estado", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'asesorAsignado', displayName: "Asesor", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'fecha', displayName: "Fecha Turno", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'fechaRespuesta', displayName: "Fecha Respuesta", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'descripcionSolicitud', displayName: "Descripcion", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'comentarioRespuesta', displayName: "Comentario Respuesta", inputFilterable: true, exactFilterable: true, sortable: true },
      ];

    return ( 
        <>
        <div className="shadow bg-light border border-dark m-5 text-center" style={{ minWidth: 1188 }}>            
            <div className="container">
              <ExcelFile
                element={<button className="shadow btn btn-success my-2">Exportar a Excel</button>}
                filename={nombreReporteFecha()}
              >
                <ExcelSheet
                   data={guardandoConsultaTurnos}
                   name="Reporte"
                >
                  <ExcelColumn label='NOMBRE' value='nombreCiudadano'/>
                  <ExcelColumn label='TURNO ASIGNADO' value='TurnoAsignado'/>
                  <ExcelColumn label='COMENTARIO RESPUESTA' value='comentarioRespuesta'/>
                  <ExcelColumn label='CORREO ELECTRONICO' value='correoElectronico'/>
                  <ExcelColumn label='DESCRIPCION SOLICITUD' value='descripcionSolicitud'/>
                  <ExcelColumn label='ESTADO SOLICITUD' value='estadoSolicitud'/>
                  <ExcelColumn label='FECHA TURNO' value='fecha'/>                  
                  <ExcelColumn label='FECHA RESPUESTA' value='fechaRespuesta'/>
                  <ExcelColumn label='CC TITULAR' value='identificacionTitular'/>
                  <ExcelColumn label='CELULAR' value='numeroCelular'/>
                  <ExcelColumn label='IDENTIFICACION' value='numeroDocumento'/>
                  <ExcelColumn label='RADICADO ASOCIADO' value='numeroRadicado'/>
                  <ExcelColumn label='TIPO AFILIACION' value='tipoAfiliacion'/>
                  <ExcelColumn label='TIPO IDENTIFICACION' value='tipoIdentificacion'/>
                  <ExcelColumn label='TIPO TURNO SELECCIONADO' value='tipoTurno'/>
                </ExcelSheet>
              </ExcelFile>

              
              <a onClick={volviendoGestion} className="shadow btn btn-danger btn-block my-2">Volver</a>              
            </div>
            <h1>Consulta de Datos Historicos</h1>
            {/* <FilterTable data={guardandoConsultaTurnos}
                recordsPerPage = { 8 }
                style = {{ position:'absolute', minWidth: '50%' }}
                classNames = {["your_css_class_1", "your_css_class_2"]}
            /> */}
            <FilterableTable              
              namespace="People"
              initialSort="name"
              data={guardandoConsultaTurnos}
              fields={fields2}
              noRecordsMessage="No hay datos para mostrar"
              noFilteredRecordsMessage="No hay coincidencias para el filtro!"
            />
        </div>
        </>
     );
}
 
export default MostrandoHistoricos;