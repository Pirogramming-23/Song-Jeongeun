def Menu1(students, name, mid, final):
    students[name] = {"mid": mid, "final": final}

def Menu2(students):
    for student in students.values():
        avg = (student["mid"] + student["final"]) / 2
        if avg >= 90:
            student["grade"] = "A"
        elif avg >= 80:
            student["grade"] = "B"
        elif avg >= 70:
            student["grade"] = "C"
        else:
            student["grade"] = "D"

def Menu3(students):
    print("name    mid   final   grade")
    print("===========================")
    for name, info in students.items():
        print(f"{name:<10}{info['mid']:<6}{info['final']:<7}{info['grade']}")
    print()

def Menu4(students, name):
    del students[name]

# 학생 정보를 저장할 딕셔너리
students = {}

# 메뉴 출력
menu_text = """*Menu*******************************
1. Inserting students Info(name score1 score2)
2. Grading
3. Printing students Info
4. Deleting students Info
5. Exit program
*************************************"""

print(menu_text)

while True:
    choice = input("Choose menu 1, 2, 3, 4, 5 : ")

    if choice == "1":
        raw = input("Enter name mid-score final-score : ").split()

        # 예외 1: 데이터 수 3개 아닌 경우
        if len(raw) != 3:
            print("Num of data is not 3!\n")
            continue

        name, mid_str, final_str = raw

        # 예외 2: 이름 중복
        if name in students:
            print("Already exist name!\n")
            continue

        # 예외 3: 점수가 양의 정수인지
        if not (mid_str.isdigit() and final_str.isdigit()):
            print("Score is not positive integer!\n")
            continue

        mid = int(mid_str)
        final = int(final_str)

        Menu1(students, name, mid, final)
        print()

    elif choice == "2":
        if not students:
            print("No student data!\n")
            continue

        Menu2(students)
        print("Grading to all students.\n")

    elif choice == "3":
        if not students:
            print("No student data!\n")
            continue

        # 학점 없는 학생이 있으면 출력 불가
        if any("grade" not in s for s in students.values()):
            print("There is a student who didn't get grade.\n")
            continue

        Menu3(students)

    elif choice == "4":
        if not students:
            print("No student data!\n")
            continue

        name = input("Enter the name to delete : ")

        if name not in students:
            print("Not exist name!\n")
        else:
            Menu4(students, name)
            print(f"{name} student information is deleted.\n")

    elif choice == "5":
        print("Exit Program!")
        break

    else:
        print("Wrong number. Choose again.\n")