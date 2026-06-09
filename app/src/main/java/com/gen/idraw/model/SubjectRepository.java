package com.gen.idraw.model;

import com.gen.idraw.R;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SubjectRepository {

    private static final List<DrawingSubject> ANIMALS;
    private static final List<DrawingSubject> VEHICLES;

    static {
        List<DrawingSubject> animals = new ArrayList<>();
        animals.add(new DrawingSubject("panda", "熊猫", DrawingCategory.ANIMAL,
                R.drawable.ic_subject_panda, R.drawable.lineart_panda));
        animals.add(new DrawingSubject("rabbit", "小兔子", DrawingCategory.ANIMAL,
                R.drawable.ic_subject_rabbit, R.drawable.lineart_rabbit));
        animals.add(new DrawingSubject("chick", "小鸡", DrawingCategory.ANIMAL,
                R.drawable.ic_subject_chick, R.drawable.lineart_chick));
        animals.add(new DrawingSubject("giraffe", "长颈鹿", DrawingCategory.ANIMAL,
                R.drawable.ic_subject_giraffe, R.drawable.lineart_giraffe));
        ANIMALS = Collections.unmodifiableList(animals);

        List<DrawingSubject> vehicles = new ArrayList<>();
        vehicles.add(new DrawingSubject("excavator", "挖掘机", DrawingCategory.VEHICLE,
                R.drawable.ic_subject_excavator, R.drawable.lineart_excavator));
        vehicles.add(new DrawingSubject("fire_truck", "消防车", DrawingCategory.VEHICLE,
                R.drawable.ic_subject_fire_truck, R.drawable.lineart_fire_truck));
        vehicles.add(new DrawingSubject("ambulance", "救护车", DrawingCategory.VEHICLE,
                R.drawable.ic_subject_ambulance, R.drawable.lineart_ambulance));
        vehicles.add(new DrawingSubject("police_car", "警车", DrawingCategory.VEHICLE,
                R.drawable.ic_subject_police_car, R.drawable.lineart_police_car));
        vehicles.add(new DrawingSubject("bicycle", "自行车", DrawingCategory.VEHICLE,
                R.drawable.ic_subject_bicycle, R.drawable.lineart_bicycle));
        VEHICLES = Collections.unmodifiableList(vehicles);
    }

    public static List<DrawingSubject> getSubjects(DrawingCategory category) {
        switch (category) {
            case ANIMAL:
                return ANIMALS;
            case VEHICLE:
                return VEHICLES;
            default:
                return Collections.emptyList();
        }
    }
}
