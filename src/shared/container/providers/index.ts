import { container } from "tsyringe";

import { IDateProvider } from "./dateprovider/IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
