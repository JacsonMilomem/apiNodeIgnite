import { container } from "tsyringe";

import { IDateProvider } from "./dateprovider/IDateProvider";
import { DayjsDateProvider } from "./dateprovider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mailprovider/IMailProvider";
import { EtherealMailProvider } from "./mailprovider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./storegeprovider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./storegeprovider/IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
