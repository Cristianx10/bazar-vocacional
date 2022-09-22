interface IComunicacionIframeDao {

    onSend: (data: Object) => void;
    onMessage: (data: Object) => void;
    setObserver: (event: (data: Object) => void) => void;

}

export default IComunicacionIframeDao;