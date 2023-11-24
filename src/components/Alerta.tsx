type AlertaProps = {

    msg: string;
    error: boolean;

};

const Alerta = ({ alerta }:{ alerta:AlertaProps} ) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-5`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
