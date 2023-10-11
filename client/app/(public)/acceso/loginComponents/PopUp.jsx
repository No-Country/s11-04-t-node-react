import { useEffect, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { backend, getAuthorization } from "@/utils/backend";
import AWN from "awesome-notifications";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/user-slice";

const ErrorMesaje = ({ codeCounter, setCodeCounter, setIsPopupOpen }) => {
  const [segundos, setSegundos] = useState(60);

  useEffect(() => {
    if (codeCounter === 0) {
      const intervalo = setInterval(() => {
        // if (segundos > 0) {
        //   setSegundos((prev) => prev - 1);
        // } else {
        //   clearInterval(intervalo);
        //   setSegundos(60);
        //   console.log("Cuenta regresiva finalizada.");
        // }
        if (segundos <= 0) {
          clearInterval(intervalo);
          setSegundos(60);
          console.log("Cuenta regresiva finalizada.");
        }
        setSegundos((prev) => prev - 1);
      }, 100);

      return () => {
        clearInterval(intervalo);
      };
    }
  }, [codeCounter, segundos]);

  useEffect(() => {
    if (segundos == 0) {
      setCodeCounter(3);
      setIsPopupOpen((prev) => !prev);
    }
  }, [segundos]);

  return (
    <article className="h-[360px] bg-[#B5AF93] w-full max-w-lg rounded-2xl p-5 flex flex-col justify-center content-center">
      <h3 className="text-4xl text-red-600 text-center capitalize py-5">
        Intentos agotados
      </h3>
      <span className="text-center w-full">
        prueba denuevo en unos minutos: {segundos}
      </span>
    </article>
  );
};

const PopUp = ({ OTPCode, setOTPCode, isPopupOpen, setIsPopupOpen }) => {
  const [code, setcode] = useState("");
  const [codeCounter, setCodeCounter] = useState(3);
  const notifier = new AWN();
  const router = useRouter();
  const dispatch = useDispatch();

  const changeCodeValue = (e) => setcode(e.target.value);

  const hanldeAuthorizedUser = () => {
    notifier.asyncBlock(
      backend.get(`charizard/`, { headers: getAuthorization(OTPCode) }),
      (res) => {
        if (true === true) {
          router.push("/panel");
          return dispatch(
            login({
              fullName: 'fulname user',
              userId : 1,
              token: 'eltokenxD',
            })
          );
        }
        notifier.alert("codigo errado, intentalo otra vez");
        setCodeCounter((prev) => prev - 1);
      },
      (err) => console.log(err)
    );
    //error
  };

  return (
    <section
      className={`fixed top-0 min-h-screen w-screen z-50 left-0 flex justify-center items-center bg-black/70 p-3 text-black tracking-widest ${
        isPopupOpen ? "visible" : "invisible"
      }`}
    >
      {codeCounter == 0 ? (
        <ErrorMesaje
          codeCounter={codeCounter}
          setCodeCounter={setCodeCounter}
          setIsPopupOpen={setIsPopupOpen}
        />
      ) : (
        <article className="grid w-full max-w-lg bg-[#B5AF93] p-3 h-[360px] rounded-2xl shadow-xl grid-rows-[1fr,auto,1fr,1fr]">
          <p
            className="text-4xl uppercase py-10 text-center font-semibold"
            title="verifica tu email o telefono"
          >
            ingresa el codigo
          </p>
          <div className="h-[20px] text-lg">
            intentos restantes:{" "}
            <span className="text-red-600 font-semibold">{codeCounter}</span>
          </div>
          <Input
            type="number"
            placeholder={"x-x-x-x"}
            style={"text-3xl text-black py-6 shadow-2xl shadow-black/70"}
            value={code}
            event={changeCodeValue}
          />
          <button
            onClick={hanldeAuthorizedUser}
            className="bg-black px-3 text-white w-60 mx-auto mt-2 tracking-widest text-lg
          hover:text-black hover:bg-white  transition-colors mb-4 shadow-2xl shadow-black/70"
          >
            verificar
          </button>
          ;
        </article>
      )}
    </section>
  );
};
export default PopUp;
