import { useSelector } from 'react-redux';

import { Loader } from '../../components/loader/loader';
import { ToastMessage } from '../../components/toastmessage/testmessage';

import styles from './agreement-page.module.css';

export const AgreementPage = () => {
  const { isError, isLoading } = useSelector((state) => state.navigation);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <ToastMessage text={isError} />
  ) : (
    <section data-test-id='contract'>
      <h1 className={styles.title}>Договор оферты</h1>
      <ol className={`${styles.listTerms} ${styles.mainList}`}>
        <li>
          <h2 className={styles.ruleItemTitle}>
            Идейные соображения высшего порядка, а также высокое качество позиционных исследований представляет собой
            интересный эксперимент проверки экспериментов, поражающих по своей масштабности и грандиозности.
          </h2>
          <ol className={styles.listTerms}>
            <li>
              Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
              участника как способного принимать собственные решения касаемо инновационных методов управления
              процессами.
            </li>
            <li>
              Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет важную
              роль в формировании приоритизации разума над эмоциями. Но некоторые особенности внутренней политики лишь
              добавляют фракционных разногласий и преданы социально-демократической анафеме.
            </li>
            <li>
              Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую
              экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
            </li>
            <li>
              Но независимые государства, которые представляют собой яркий пример континентально-европейского типа
              политической культуры, будут объединены в целые кластеры себе подобных.
            </li>
          </ol>
        </li>
        <li>
          <h2 className={styles.ruleItemTitle}>
            С учётом сложившейся международной обстановки, консультация с широким активом предоставляет широкие
            возможности для приоритизации разума над эмоциями.
          </h2>
          <ol className={styles.listTerms}>
            <li>
              Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
              участника как способного принимать собственные решения касаемо инновационных методов управления
              процессами.
              <ol className={styles.listTerms}>
                <li>
                  Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет
                  важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности внутренней
                  политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме.
                </li>
                <li>
                  Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую
                  экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали
                </li>
              </ol>
            </li>
            <li>
              Но независимые государства, которые представляют собой яркий пример континентально-европейского типа
              политической культуры, будут объединены в целые кластеры себе подобных.
            </li>
          </ol>
        </li>
        <li>
          Принимая во внимание показатели успешности, укрепление и развитие внутренней структуры требует от нас анализа
          приоритизации разума над эмоциями.
          <ol className={styles.listTerms}>
            <li>
              Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
              участника как способного принимать собственные решения касаемо инновационных методов управления
              процессами.
              <ol className={styles.listTerms}>
                <li>
                  Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет
                  важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности внутренней
                  политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме.
                </li>
                <li>
                  Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся непростую
                  экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                </li>
              </ol>
            </li>
            <li>
              Но независимые государства, которые представляют собой яркий пример континентально-европейского типа
              политической культуры, будут объединены в целые кластеры себе подобных.
            </li>
            <li>
              Не следует, однако, забывать, что экономическая повестка сегодняшнего дня требует анализа анализа
              существующих паттернов поведения.
              <ol className={styles.listTerms}>
                <li>
                  А ещё представители современных социальных резервов набирают популярность среди определенных слоев
                  населения, а значит, должны быть функционально разнесены на независимые элементы.
                  <ol className={styles.listTerms}>
                    <li>
                      Стремящиеся вытеснить традиционное производство, нанотехнологии могут быть объявлены нарушающими
                      общечеловеческие нормы этики и морали.
                    </li>
                    <li>
                      Прежде всего, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует
                      необходимость новых предложений. Являясь всего лишь частью общей картины, независимые государства
                      представлены в исключительно положительном свете.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              Повседневная практика показывает, что убеждённость некоторых оппонентов требует от нас анализа
              распределения внутренних резервов и ресурсов.
            </li>
          </ol>
        </li>
      </ol>
    </section>
  );
};
