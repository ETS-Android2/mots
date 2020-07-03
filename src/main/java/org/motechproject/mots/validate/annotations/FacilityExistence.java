package org.motechproject.mots.validate.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import org.motechproject.mots.constants.ValidationMessageConstants;
import org.motechproject.mots.validate.constraintvalidators.FacilityExistenceValidator;

@Target(ElementType.FIELD)
@Constraint(validatedBy = {FacilityExistenceValidator.class})
@Retention(RetentionPolicy.RUNTIME)
public @interface FacilityExistence {

  /**
   * Specify the message in case of a validation error.
   *
   * @return the message about the error
   */
  String message() default ValidationMessageConstants.NOT_EXISTING_FACILITY;

  /**
   * Specify validation groups, to which this constraint belongs.
   *
   * @return array with group classes
   */
  Class<?>[] groups() default {
  };

  /**
   * Specify custom payload objects.
   *
   * @return array with payload classes
   */
  Class<? extends Payload>[] payload() default {
  };
}
