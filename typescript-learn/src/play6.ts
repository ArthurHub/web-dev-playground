// Needed for all mixins
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

////////////////////
// Example mixins
////////////////////

// A mixin that adds a property
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// a mixin that adds a property and methods
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate(): void {
      this.isActivated = true;
    }

    deactivate(): void {
      this.isActivated = false;
    }
  };
}

////////////////////
// Usage to compose classes
////////////////////

// Simple class
class User {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// User that is Timestamped
const TimestampedUser = Timestamped(User);

// User that is Timestamped and Activatable
const TimestampedActivatableUser = Timestamped(Activatable(User));

export function doMixin(): void {
  const timestampedUserExample = new TimestampedUser('foo');
  console.log(`${timestampedUserExample.name} ${timestampedUserExample.timestamp}`);

  const timestampedActivatableUserExample = new TimestampedActivatableUser('bar');
  console.log(
    `${timestampedActivatableUserExample.name} ${timestampedActivatableUserExample.timestamp}`,
  );
  console.log(timestampedActivatableUserExample.isActivated);
  timestampedActivatableUserExample.activate();
  console.log(timestampedActivatableUserExample.isActivated);
}
