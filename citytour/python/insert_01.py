import pymysql
import pandas as pd

#-- DB info -------------------------------------
import configparser as parser
properties = parser.ConfigParser()
properties.read('../../config/config.ini')

conn = pymysql.connect(host=properties['PATH']['host'],
        user=properties['PATH']['user'],
        password=properties['PATH']['password'],
        db=properties['PATH']['db'],
        charset='utf8')

try:
    #-- csv 1번째 줄, 첫 컬럼 - 테이블 명  (csv 파일 열어서 추가함)
    #-- 2번째 줄 - 컬럼명
    csv_test = pd.read_csv('data_01.csv', header=None )
    tb_name = (csv_test.head(1).values.tolist())[0][0]
    col_list = (csv_test.head(2).values.tolist())[1]

    # header, 첫줄을 skip하고 읽기
    csv_test2 = pd.read_csv('data_01.csv', header=0, skiprows=1 )
    csv_test2 = csv_test2.fillna('')
    csv_list = csv_test2.values.tolist()

    # INSERT
    with conn.cursor() as curs:
        sql_col = ""
        sql_val = ""
        n = 0
        for i in col_list:
            if n != 0:
                sql_col += ","
                sql_val += ","

            sql_col += i
            sql_val += "%s"
            n += 1
#        sql = "insert into course_tb (sg_cd,ct_cd,cs_name,cs_addr,cs_img,cs_lan,cs_lng) values (%s,%s,%s,%s,%s,%s,%s)"
        sql = "insert into "+ tb_name +" ("+ sql_col  +") values ("+sql_val +") "
        print(sql)

        curs.executemany(sql, csv_list)
        conn.commit()

    # SELECT
    with conn.cursor() as curs:
        sql = "SELECT * FROM "+ tb_name
        curs.execute(sql)
        rs = curs.fetchall()
        for row in rs:
            print(row)

finally:
    conn.close()
