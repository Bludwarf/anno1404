import * as config from '../../assets/anno1404.config.json';

interface BuildingJSON {
  resource: string;
  tpm: number;
}

export class Building {
  public static getBuildingNameProducing(resource: string): string {
    for (const [buildingName, building] of Object.entries(config.buildings)) {
      if (building.resource === resource) {
        return buildingName;
      }
    }
    throw new Error(`Building producing ${resource} not found in config.json`);
  }

  public static get(name: string): BuildingJSON {
    const prodBuilding = config.buildings[name];
    if (!prodBuilding) {
      throw new Error(`Building ${name} not found in config.json`);
    }
    return prodBuilding;
  }

}
