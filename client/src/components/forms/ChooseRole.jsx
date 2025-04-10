import ButtonWithIcons from "../ui/ButtonWithIcons";

const ChooseRole = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="flex flex-col items-center pt-32 px-6 mx-auto md:h-screen">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-8 space-y-6">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
            Join as a Client or Service Pro
          </h1>

          <div className="flex flex-col gap-4">
            <ButtonWithIcons
              text="Sign in as a Client"
              variant="client"
              className="w-full py-3 text-lg font-medium"
            />
            <ButtonWithIcons
              text="Sign in as a Service Pro"
              variant="pro"
              className="w-full py-3 text-lg font-medium"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChooseRole;
