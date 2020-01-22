package org.motechproject.mots.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import org.motechproject.mots.domain.CallDetailRecord;
import org.motechproject.mots.domain.enums.CallStatus;
import org.springframework.data.repository.CrudRepository;

public interface CallDetailRecordRepository extends CrudRepository<CallDetailRecord, UUID> {

  List<CallDetailRecord> findByCallLogIdAndCallStatus(String callLogId, CallStatus callStatus);

  @SuppressWarnings("checkstyle:linelength")
  List<CallDetailRecord> findAllByCreatedDateGreaterThanEqualAndCreatedDateLessThanAndCallStatusAndChwIvrIdAndCallLogIdNotLike(
      Date startDate, Date endDate, CallStatus status, String chwIvrId, String callLogId);

}
