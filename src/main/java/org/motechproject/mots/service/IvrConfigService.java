package org.motechproject.mots.service;

import java.util.Iterator;
import org.motechproject.mots.domain.IvrConfig;
import org.motechproject.mots.exception.EntityNotFoundException;
import org.motechproject.mots.repository.IvrConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This class is responsible for managing {@link IvrConfig} that is required for a proper
 *      connection to IVR system and customizing theirs features (e.g. delay time after call fails).
 */
@Service
public class IvrConfigService {

  private final IvrConfigRepository ivrConfigRepository;

  private final IvrConfig ivrConfig;

  @Autowired
  public IvrConfigService(IvrConfigRepository ivrConfigRepository) {
    this.ivrConfigRepository = ivrConfigRepository;
    this.ivrConfig = getFirstConfig();
  }

  /**
   * Get IVR config from DB.
   *
   * @return IVR config
   * @throws EntityNotFoundException if IVR config is not found
   */
  public IvrConfig getConfig() {
    if (ivrConfig == null) {
      throw new EntityNotFoundException("IVR config not preset");
    }
    return ivrConfig;
  }

  private IvrConfig getFirstConfig() {
    Iterator<IvrConfig> ivrConfigIterator = ivrConfigRepository.findAll().iterator();
    if (!ivrConfigIterator.hasNext()) {
      return null;
    }
    return ivrConfigIterator.next();
  }
}
