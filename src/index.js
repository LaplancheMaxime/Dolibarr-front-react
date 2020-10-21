import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/plugins/jqvmap/jqvmap.min.css'
import 'admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-autofill/css/autoFill.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-colreorder/css/colReorder.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-fixedheader/css/fixedHeader.bootstrap4.min.css'
import 'admin-lte/dist/css/adminlte.css'
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import 'admin-lte/plugins/daterangepicker/daterangepicker.css'
import 'admin-lte/plugins/summernote/summernote-bs4.css'
// import 'admin-lte/plugins/jquery/jquery'
// import 'admin-lte/plugins/jquery-ui/jquery-ui'
// import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
// import 'admin-lte/plugins/chart.js/Chart'
// import 'admin-lte/plugins/sparklines/sparkline'
// import 'admin-lte/plugins/jqvmap/jquery.vmap'
// import 'admin-lte/plugins/jqvmap/maps/jquery.vmap.france'
// import 'admin-lte/plugins/jquery-knob/jquery.knob'
// import 'admin-lte/plugins/moment/moment'
// import 'admin-lte/plugins/daterangepicker/daterangepicker'
// import 'admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4'
// import 'admin-lte/plugins/summernote/summernote-bs4'
// import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars'

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
