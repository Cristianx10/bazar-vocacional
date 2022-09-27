interface IComunicacionIframeDao<I> {

    onSend: (data: I) => void;
    setObserver: (event: (data: I) => void) => void;

}

export default IComunicacionIframeDao;