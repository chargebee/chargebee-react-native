import { CustomField } from '../interfaces/cb-types';

export abstract class BaseBuilder {
  mapCustomAttributes(customFields?: CustomField[]) {
    if (!customFields) {
      return {};
    }
    return customFields.reduce(
      (acc: { [key: string]: string }, cf: CustomField) => {
        acc[`cf_${cf.name}`] = encodeURI(cf.value);
        return acc;
      },
      {}
    );
  }

  mapBaseAttributes(baseAttributes: object) {
    return Object.entries(baseAttributes).reduce(
      (acc: { [key: string]: string }, [key, value]) => {
        const mappedKey = this.mapper(key);
        if (mappedKey) {
          acc[mappedKey] = value;
        }
        return acc;
      },
      {}
    );
  }

  mapArrayAttributes(val: object[]) {
    return val.map((v) => {
      return Object.entries(v).reduce(
        (acc: { [k: string]: any }, [key, value]) => {
          acc[this.mapper(key)] = value;
          return acc;
        },
        {}
      );
    });
  }

  private mapper(attributeName: string): string {
    return this.getAttributeMap()[attributeName] || '';
  }

  protected abstract getAttributeMap(): { [k: string]: string };
  // public abstract build(): {[k: string]: any};
  public abstract toUrl(): string;
}
