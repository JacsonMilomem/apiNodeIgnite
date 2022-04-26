import { container } from "tsyringe";

import { IDateProvider } from "./dateprovider/IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";
import { IMailProvider } from "./mailprovider/IMailProvider";
import { EtherealMailProvider } from "./mailprovider/implamantations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
