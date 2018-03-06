package org.motechproject.mots.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.Valid;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "unit")
@NoArgsConstructor
public class Unit extends IvrObject {

  @Column(name = "name", nullable = false)
  @Getter
  @Setter
  private String name;

  @Type(type = "text")
  @Column(name = "description")
  @Getter
  @Setter
  private String description;

  @Column(name = "list_order", nullable = false)
  @Getter
  @Setter
  private Integer listOrder;

  @Valid
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "unit_id")
  @OrderBy("list_order ASC")
  @Getter
  private List<CallFlowElement> callFlowElements;

  @Valid
  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "continuation_question_id")
  @Getter
  @Setter
  private MultipleChoiceQuestion unitContinuationQuestion;

  @Column(name = "allow_replay", nullable = false)
  @Getter
  @Setter
  private Boolean allowReplay;

  private Unit(String ivrId, String ivrName, String name, String description,
      Integer listOrder,
      List<CallFlowElement> callFlowElements,
      MultipleChoiceQuestion unitContinuationQuestion, Boolean allowReplay) {
    super(ivrId, ivrName);
    this.name = name;
    this.description = description;
    this.listOrder = listOrder;
    this.callFlowElements = callFlowElements;
    this.unitContinuationQuestion = unitContinuationQuestion;
    this.allowReplay = allowReplay;
  }

  /**
   * Update list content.
   * @param callFlowElements list of new Call Flow Elements
   */
  public void setCallFlowElements(List<CallFlowElement> callFlowElements) {
    if (this.callFlowElements == null) {
      this.callFlowElements = callFlowElements;
    } else if (!this.callFlowElements.equals(callFlowElements)) {
      this.callFlowElements.clear();

      if (callFlowElements != null) {
        this.callFlowElements.addAll(callFlowElements);
      }
    }
  }

  /**
   * Create a drat copy of Unit.
   * @return copy of Unit
   */
  public Unit copyAsNewDraft() {
    MultipleChoiceQuestion unitContinuationQuestionCopy = null;

    if (unitContinuationQuestion != null) {
      unitContinuationQuestionCopy = unitContinuationQuestion.copyAsNewDraft();
    }

    List<CallFlowElement> callFlowElementsCopy = new ArrayList<>();

    if (callFlowElements != null) {
      callFlowElements.forEach(callFlowElement ->
          callFlowElementsCopy.add(callFlowElement.copyAsNewDraft()));
    }

    return new Unit(getIvrId(), getIvrName(), name, description, listOrder, callFlowElementsCopy,
        unitContinuationQuestionCopy, allowReplay);
  }
}
