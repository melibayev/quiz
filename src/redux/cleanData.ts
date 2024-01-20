import { persistor } from "./store";

const purgePersistedData = () => {
  persistor.purge();
};

export default purgePersistedData;
